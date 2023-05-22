import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";

export default function DonateScreen({ navigation }) {
  const [category, setCategory] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "제과류", value: "1" },
    { label: "즉석식품", value: "2" },
    { label: "냉동식품", value: "3" },
    { label: "통조림", value: "4" },
    { label: "장류", value: "5" },
    { label: "소스류", value: "6" },
    { label: "기름류", value: "7" },
    { label: "음료류", value: "8" },
    { label: "육가공류", value: "9" },
    { label: "농산물", value: "10" },
    { label: "제빵류", value: "11" },
    { label: "세제류", value: "12" },
    { label: "휴지류", value: "13" },
    { label: "수건류", value: "14" },
    { label: "기저귀류", value: "15" },
    { label: "신체 위생용품류", value: "16" },
    { label: "여성 위생용품류", value: "17" },
    { label: "청소 & 환경 위생용품류", value: "18" },
  ]);

  return (
    <View style={styles.registerBody}>
      <ScreenHeader headerTitle="기부하기" />
      <View style={styles.registerContent}>
        <Text style={styles.personalizeText}>지영 님 마음 전달 중 ...♥</Text>
        <View style={styles.registerBox}>
          <View style={styles.registerDonate1}>
            <Text style={styles.text}>대분류 선택 *</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="물품 분류를 선택해주세요"
              listMode="MODAL"
              modalProps={{
                animationType: "fade",
              }}
              modalTitle="물품 분류 선택"
              style={{
                borderWidth: 0.5,
                minHeight: "20%",
              }}
            />
            <View style={styles.donateItemPic}>
              <Text style={{ color: "red", fontSize: 13 }}>
                유통기한이 있다면 보이게 찍어주세요
              </Text>
              <Pressable style={styles.itemPicBtn}>
                <Text style={{ fontWeight: 700 }}>기부 물품 찍기</Text>
              </Pressable>
              <Text style={{ color: "grey", fontSize: 13 }}>
                여러 개인 경우 전체적인 모습을 찍어주세요
              </Text>
            </View>
          </View>

          <View style={styles.registerDonate2}>
            <Text style={styles.text}>대표 물품명 *</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="대표 물품을 입력해주세요"
              style={styles.inputText}
            />
            <Text style={styles.text}>수량 *</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="총 수량을 입력해주세요"
              style={styles.inputText}
            />
            <Text style={styles.text}>기부자명 *</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="기부자 닉네임을 적어주세요"
              style={styles.inputText}
            />
          </View>
          <LinearGradient
            colors={["#3b5998", "#3b5998", "#003C7C"]}
            style={styles.registerBtn}
          >
            <Pressable onPress={() => navigation.navigate("DonateScreen2")}>
              <Text style={styles.registerBtnText}>다음</Text>
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
    height: "45%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "3%",
    boxSizing: "border-box",
    paddingHorizontal: "7%",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingVertical: "3%",
  },
  registerDonate2: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#8B8B8B",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.16,
    borderRadius: 8,
    width: "91%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "3%",
    alignItems: "center",
    boxSizing: "border-box",
    paddingHorizontal: "7%",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingVertical: "4%",
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
  donateItemPic: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 88,
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
  text: {
    // paddingVertical: "3%",
  },
  itemPicBtn: {
    borderRadius: 5,
    height: "50%",
    width: "100%",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "3%",
  },
});
