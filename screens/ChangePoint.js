import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { LinearGradient } from "expo-linear-gradient";

export default function ChangePoint({ navigation }) {
  const [point, setPoint] = useState("");
  const onSubmit = () => {
    // if (money) {
    //     const data = {
    //         point: point
    //     };
    //     axios.post(`http://${ipAddress}:8080/`, data,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(() => {
    //             navigation.navigate('MainScreen');
    //         })
    //         .catch(error => console.log(error));
    // }
  };
  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="변환하기" />
      <View style={styles.joinContent}>
        <Text style={styles.boldText}>포인트로 변환할 금액 *</Text>
        <TextInput
          value={point}
          onChangeText={setPoint}
          placeholder="충전할 금액에서 기부할 금액을 입력해주세요"
          style={styles.input}
        />
        <LinearGradient
          colors={["#4A6BAC", "#1B3974"]}
          style={styles.imgBackground}
        >
          <Pressable style={styles.imgBackgroundBtn} onPress={onSubmit}>
            <Text style={styles.submitBtnText}>변환하기</Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.changePointSpan}>
          <Text style={styles.red}>
            포인트로 전환한 이후에는 돈으로 바꿀 수 없습니다. {"\n"}신중하게
            기부할 금액을 입력해주세요.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  joinContent: {
    width: "87%",
    height: "40%",
    position: "absolute",
    top: "18%",
    justifyContent: "space-around",
  },
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 19,
  },
  changePointSpan: {
    width: "100%",
    height: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    // borderWidth: 1,
    paddingRight: "2%",
  },
  red: {
    color: "#CA0000",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.06,
  },
  imgBackground: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(13, 27, 43, 0.35)",
    borderRadius: 5,
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    color: "white",
    boxShadow: "2px 3px 3px rgba(117, 147, 106, 0.2)",
    width: "100%",
    height: "24%",
  },
  imgBackgroundBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontSize: 16,
    fontWeight: 600,
  },
});
