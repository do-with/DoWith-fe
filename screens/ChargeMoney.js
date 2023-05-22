import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { LinearGradient } from "expo-linear-gradient";

export default function ChargeMoney({ navigation }) {
  const [money, setMoney] = useState("");
  const onSubmit = () => {
    // if (money) {
    //     const data = {
    //         money: money
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
      <ScreenHeader headerTitle="충전하기" />
      <View style={styles.joinContent}>
        <Text style={styles.boldText}>충전 금액 *</Text>
        <TextInput
          value={money}
          onChangeText={setMoney}
          placeholder="충전 금액을 입력하세요"
          style={styles.input}
        />
        <LinearGradient
          colors={["#4A6BAC", "#1B3974"]}
          style={styles.imgBackground}
        >
          <Pressable style={styles.imgBackgroundBtn} onPress={onSubmit}>
            <Text style={styles.submitBtnText}>충전하기</Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.chargeSpan}>
          <Text style={styles.black}>
            충전하시는 금액은 포인트로 전환이 가능합니다.
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
    height: "35%",
    position: "absolute",
    top: "18%",
    justifyContent: "space-around",
  },
  chargeSpan: {
    width: "100%",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    paddingRight: "8%",
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
    height: "27%",
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
  black: {
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.06,
  },
});
