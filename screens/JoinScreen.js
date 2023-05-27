import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  TextInput,
  Alert,
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
  const [birth, setBirth] = useState("");

  // 체크박스 폼
  const [isAgreed1, setIsAgreed1] = useState(false); // 개인정보수집이용 동의 여부
  const [isAgreed2, setIsAgreed2] = useState(false); // 마케팅 정보 수신

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
              {/* <TextInput
                                value={birth}
                                onChangeText={setBirth}    
                                style={styles.birthForm}
                            />    */}
            </View>

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
});
