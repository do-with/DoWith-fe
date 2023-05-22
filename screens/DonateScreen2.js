import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Pressable,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { LinearGradient } from "expo-linear-gradient";
import Postcode from "@actbase/react-daum-postcode";
import Modal from "react-native-modal";

export default function DonateScreen2({ navigation }) {
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isModal, setModal] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("");

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  let methodDescription = "";

  switch (selectedMethod) {
    case "택배":
      methodDescription = "지정된 매장 주소로 택배를 보내주셔야 합니다.";
      break;
    case "수거":
      methodDescription = "관리자와 연락해 수거 일정을 조율해주셔야 합니다.";
      break;
    case "방문":
      methodDescription = "푸드 뱅크에 직접 방문해 물품을 전달해주셔야 합니다.";
      break;
    default:
      methodDescription = "기부 방법을 선택해주세요.";
  }

  return (
    <View style={styles.registerBody}>
      <ScreenHeader headerTitle="기부하기" />
      <View style={styles.registerContent}>
        <Text style={styles.personalizeText}>지영 님 마음 전달 중 ...♥</Text>
        <View style={styles.registerBox}>
          <View style={styles.registerDonate1}>
            <View style={styles.registerAddress}>
              <Modal isVisible={isModal}>
                <Postcode
                  style={{ width: "120%", height: "80%", marginLeft: "-10%" }}
                  jsOptions={{ animation: true, hideMapBtn: true }}
                  onSelected={(data) => {
                    // alert(JSON.stringify(data));
                    setModal(false);
                    setPostcode(data.zonecode);
                    setAddress(data.roadAddress);
                  }}
                />
              </Modal>
              <View style={styles.findAddress}>
                <Text style={styles.text}>우편번호 *</Text>
                <View>
                  <Pressable
                    onPress={() => setModal(true)}
                    style={styles.addressBtn}
                  >
                    <Text>주소찾기</Text>
                  </Pressable>
                </View>
              </View>
              <TextInput
                value={postcode}
                onChangeText={setPostcode}
                placeholder="우편번호"
                style={styles.inputText}
              />
              <Text style={styles.text}>주소 *</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="주소"
                style={styles.inputText}
              />
              <Text style={styles.text}>상세 주소 *</Text>
              <TextInput
                value={detailAddress}
                onChangeText={setDetailAddress}
                placeholder="상세 주소"
                style={styles.inputText}
              />
            </View>
          </View>
          <View style={[styles.registerDonate1, styles.registerDonate1Sm]}>
            <Text>기부 방법을 선택해주세요 *</Text>
            <View style={styles.howToDonateBtn}>
              <Pressable
                style={[
                  styles.itemPicBtn,
                  selectedMethod === "택배" && styles.selectedButton,
                ]}
                onPress={() => handleMethodSelect("택배")}
              >
                <Text>택배</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.itemPicBtn,
                  selectedMethod === "수거" && styles.selectedButton,
                ]}
                onPress={() => handleMethodSelect("수거")}
              >
                <Text>수거</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.itemPicBtn,
                  selectedMethod === "방문" && styles.selectedButton,
                ]}
                onPress={() => handleMethodSelect("방문")}
              >
                <Text>방문</Text>
              </Pressable>
            </View>
            <Text style={styles.methodDescription}>{methodDescription}</Text>
          </View>
          <LinearGradient
            colors={["#3b5998", "#3b5998", "#003C7C"]}
            style={styles.registerBtn}
          >
            <Pressable onPress={() => navigation.navigate("AfterDonate")}>
              <Text style={styles.registerBtnText}>완료</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerBody: {
    width: "100%",
    height: "100%",
    backgroundColor: Variables.mainColor,
    flexWrap: "wrap",
  },
  registerContent: {
    width: "100%",
    height: "75%",
    position: "relative",
    top: "15%",
  },
  personalizeText: {
    letterSpacing: 1,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 23,
    color: "#2D4C89",
    marginLeft: "8%",
  },
  registerBox: {
    width: "100%",
    height: "91%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2%",
  },
  registerDonate1: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#8B8B8B",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.16,
    borderRadius: 8,
    width: "91%",
    height: "53%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "3%",
    alignItems: "center",
    boxSizing: "border-box",
    paddingTop: "6%",
  },
  registerAddress: {
    display: "flex",
    flexDirection: "column",
    width: "85%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  findAddress: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "97%",
    height: "13%",
    // marginBottom: "4%",
  },
  registerDonate1Sm: {
    height: "35%",
    alignItems: "flex-start",
    paddingHorizontal: "5%",
  },
  howToDonateBtn: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "45%",
    justifyContent: "space-evenly",
    marginTop: "2%",
  },
  registerBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxSizing: "border-box",
    backgroundBlendMode: "soft-light, normal",
    shadowColor: "rgba(166, 171, 189, 0.8)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 5,
    color: "white",
    width: "30%",
    height: "10%",
    left: "30%",
    marginTop: "4%",
  },
  registerBtnText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#fff",
  },
  itemPicBtn: {
    borderRadius: 5,
    height: "80%",
    width: "32%",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "3%",
    borderColor: "black",
  },
  inputText: {
    width: "100%",
    height: "15%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderBottomWidth: 0.5,
    marginBottom: "3%",
  },
  addressBtn: {
    borderWidth: 1,
    borderColor: "#A3A2A2",
    borderRadius: 5,
    width: "120%",
    height: "110%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    borderColor: "red",
  },
  methodDescription: {
    color: "gray",
  },
});
