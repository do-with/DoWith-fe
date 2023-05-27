import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { LinearGradient } from "expo-linear-gradient";
import { CustomCheckBox } from "../components/CustomCheckBox";
import { ipAddress } from "../ipAddress";
import axios from "axios";
import DatePicker from "../components/DatePicker";

// 유효성 검사 필요
// 휴대전화 인증 필요
export default function Join1({ navigation }) {
  // 입력 폼
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [area, setArea] = useState("제주");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null); // 선택된 버튼의 인덱스 저장

  // 체크박스 폼
  const [isAgreed1, setIsAgreed1] = useState(false); // 개인정보수집이용 동의 여부
  const [isAgreed2, setIsAgreed2] = useState(false); // 마케팅 정보 수신

  const areaMappings = {
    서울: 2,
    부산: 3,
    대구: 4,
    인천: 5,
    광주: 6,
    대전: 7,
    울산: 8,
    경기: 9,
    강원: 10,
    충북: 11,
    충남: 12,
    전북: 13,
    전남: 14,
    경북: 15,
    경남: 16,
    제주: 17,
    세종: 20,
  };

  const areas = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
    "세종",
  ];

  const openSelectModal = () => {
    setModalVisible(true);
  };

  const onPressArea = (area) => {
    const areaNumber = areaMappings[area];
    alert(areaNumber);
    setArea(area);
    setModalVisible(false);
    setSelectedButtonIndex(area);
  };

  const chunk = (arr, size) => {
    const chunks = [];
    const numChunks = Math.ceil(arr.length / size);

    for (let i = 0; i < size; i++) {
      const chunk = [];
      for (let j = 0; j < numChunks; j++) {
        const element = arr[j * size + i];
        if (element !== undefined) {
          chunk.push(element);
        }
      }
      chunks.push(chunk);
    }

    return chunks;
  };

  const clickJoin = () => {
    if (password !== checkPassword) {
      Alert.alert("비밀번호");
    } else if (
      name &&
      phone &&
      email &&
      birth &&
      password &&
      checkPassword &&
      isAgreed1 &&
      isAgreed2
    ) {
      const data = {
        email: email,
        password: password,
        name: name,
        use_pcy_agree_yn: isAgreed1,
        info_proc_agree_yn: isAgreed2,
        phone: phone,
        birth_date: birth,
      };

      axios
        .post(`http://${ipAddress}:8080/user`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          Alert.alert("회원가입에 성공하셨습니다! 다시 로그인해주세요");
          navigation.navigate("LoginScreen");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="회원가입" />
      <ScrollView
        contentContainerStyle={styles.joinContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.scrollView}>
          <View style={styles.inputInfo}>
            <View style={styles.inputText}>
              <Text style={styles.inputTitle}>이메일 *</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="이메일 입력"
                style={styles.textForm}
              />
            </View>

            <View style={styles.inputText}>
              <Text style={styles.inputTitle}>비밀번호 *</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호 입력"
                style={styles.textForm}
              />
            </View>

            <View style={styles.inputText}>
              <Text style={styles.inputTitle}>비밀번호 확인 *</Text>
              <TextInput
                value={checkPassword}
                onChangeText={setCheckPassword}
                placeholder="비밀번호 확인"
                style={styles.textForm}
              />
            </View>
            <View style={styles.inputText}>
              <Text style={styles.inputTitle}>이름 *</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="이름 입력(ex 홍길동)"
                style={styles.textForm}
              />
            </View>

            <View style={[styles.inputPhoneText, { marginBottom: "10%" }]}>
              <Text style={styles.inputTitle}>휴대전화 *</Text>
              <View style={styles.phoneHorizontal}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="휴대전화 번호 입력"
                  style={styles.phoneForm}
                />
                <Pressable style={styles.phoneAuth}>
                  <Text>인증하기</Text>
                </Pressable>
              </View>
              <Text>기부에 필요한 정보를 수집합니다.</Text>
            </View>

            <View style={styles.inputPhoneText}>
              <Text style={styles.inputTitle}>생년월일 *</Text>
              <DatePicker />
            </View>

            <View style={styles.inputText}>
              <Text style={styles.inputTitle}>거주 지역 *</Text>
              <Pressable onPress={openSelectModal} style={styles.areaName}>
                <Text
                  style={{ fontWeight: 700, fontSize: 17, color: "#3a3a3a" }}
                >
                  {area}
                </Text>
              </Pressable>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>거주 지역을 선택해주세요</Text>
                  <View style={styles.modalBtnView}>
                    {chunk(areas, 4).map((chunk, index) => (
                      <View key={index}>
                        {chunk.map((area, index) => (
                          <View key={index}>
                            <Pressable
                              onPress={() => onPressArea(area)}
                              style={[
                                styles.modalBtn,
                                selectedButtonIndex === area &&
                                  styles.selectedModalBtn,
                              ]}
                            >
                              <Text
                                style={
                                  selectedButtonIndex === area &&
                                  styles.selectedModalBtnText
                                }
                              >
                                {area}
                              </Text>
                            </Pressable>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.button}
                  >
                    <Text style={styles.textStyle}>닫기</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <View>
              <CustomCheckBox
                value={isAgreed1}
                onValueChange={setIsAgreed1}
                text="[필수]이용 약관과 개인 정보 수집 및 이용에 동의합니다"
              />
              <CustomCheckBox
                value={isAgreed2}
                onValueChange={setIsAgreed2}
                text="이메일 SNS 마케팅 정보 수신 동의합니다"
              />
            </View>

            <View style={styles.joinBtnView}>
              <LinearGradient
                colors={["#4A6BAC", "#1B3974"]}
                style={styles.joinBtn}
              >
                <Pressable onPress={clickJoin}>
                  <Text style={styles.joinBtnText}>가입하기</Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
  },
  joinContent: {
    width: "100%",
    alignItems: "center",
    top: "14%",
    paddingBottom: 400,
  },
  scrollView: {
    width: "90%",
    height: "90%",
    top: "30%",
  },
  inputInfo: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  inputText: {
    width: "100%",
    height: "12%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginVertical: "4%",
  },
  inputTitle: {
    marginBottom: "3%",
    fontSize: 14,
  },
  textForm: {
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    fontSize: 16,
    fontWeight: "300",
    paddingBottom: "2%",
  },
  inputPhoneText: {
    width: "100%",
    height: "15%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginVertical: "4%",
  },
  phoneHorizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50%",
    marginBottom: "2%",
  },
  phoneForm: {
    width: "77%",
    height: "100%",
    backgroundColor: "rgba(245, 245, 245, 0.52)",
    borderWidth: 1,
    borderColor: "#A3A2A2",
    borderRadius: 5,
    color: "#ABABAB",
    paddingLeft: "5%",
    fontSize: 16,
  },
  phoneAuth: {
    borderWidth: 1,
    borderColor: "#A3A2A2",
    borderRadius: 5,
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  birthForm: {
    width: "100%",
    height: "50%",
    backgroundColor: "rgba(245, 245, 245, 0.52)",
    borderWidth: 1,
    borderColor: "#A3A2A2",
    borderRadius: 5,
    color: "#ABABAB",
    paddingLeft: "5%",
    fontSize: 14,
  },
  joinBtnView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  joinBtn: {
    backgroundColor: Variables.btnColor,
    borderRadius: 5,
    width: "100%",
    height: "32%",
    justifyContent: "center",
    alignItems: "center",
  },
  joinBtnText: {
    color: "white",
    fontSize: 19,
    fontWeight: 700,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    padding: "3%",
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: "3%",
    width: "20%",
    elevation: 2,
    backgroundColor: Variables.btnColor,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalBtnView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: "75%",
  },
  modalBtn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 55,
    height: 35,
    marginBottom: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#B5B5B5",
    borderRadius: 4,
  },
  selectedModalBtn: {
    backgroundColor: Variables.btnColor, // 선택된 버튼의 색상
    borderWidth: 0,
  },
  selectedModalBtnText: {
    color: "white", // 선택된 버튼의 글자색
  },
  areaName: {
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    paddingBottom: "2%",
  },
});
