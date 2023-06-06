import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SupportMoney({ navigation }) {
  const [point, setPoint] = useState();
  const [name, setName] = useState();

  const onSubmit = () => {
    // if (point && content) {
    //     const data = {
    //         point: point,
    //         name: name,
    //     };
    //     axios.post(`http://${ipAddress}:8080/`, data,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(() => {
    //             navigation.navigate('AfterSupport');
    //         })
    //         .catch(error => console.log(error));
    // }
    navigation.navigate("AfterSupport");
  };

  const onNext = () => {
    navigation.navigate("MainScreen");
  };

  const handlePointChange = (text) => {
    // 숫자 이외의 문자 제거
    const cleanedText = text.replace(/[^0-9]/g, "");

    setPoint(cleanedText);
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View style={styles.joinBody}>
        <LinearGradient
          colors={[
            "#E1EFFF",
            "rgba(246, 250, 255, 0.517708)",
            "rgba(255, 255, 255, 0)",
          ]}
          style={styles.backgroundGradient}
        />
        <View style={styles.joinContent}>
          <Pressable onPress={() => navigation.goBack()} style={styles.next}>
            <Text style={styles.nextText}>다음에 하기</Text>
          </Pressable>
          <View style={styles.supportMoneyTitleView}>
            <Image
              source={require("../assets/people.png")}
              style={styles.supportMoneyImg}
              resizeMode={"contain"}
            />
            <Text style={styles.supportMoneyTitle}>
              푸드뱅크에 {"\n"}후원하기
            </Text>
          </View>

          <View style={styles.inputView}>
            <View style={styles.supportMoneyInput}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>후원 포인트 </Text>
                <Text style={[styles.inputTitle, { color: "#FF1919" }]}>*</Text>
              </View>

              <TextInput
                value={point}
                onChangeText={handlePointChange}
                placeholder="후원 포인트 입력"
                keyboardType="numeric"
                style={styles.textForm}
              />
            </View>
            <View style={styles.supportMoneyInput}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>기부자 닉네임 </Text>
                <Text style={[styles.inputTitle, { color: "#FF1919" }]}>*</Text>
              </View>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="닉네임 입력(ex 어피치)"
                style={styles.textForm}
              />
            </View>
            <View style={styles.hightlight}>
              <View style={styles.hightBlock}></View>
              <Text style={styles.hightText}>푸드뱅크에 후원한다는 것은?</Text>
            </View>
          </View>
          <LinearGradient
            colors={["#4A6BAC", "#1B3974"]}
            style={styles.imgBackground}
          >
            <Pressable onPress={onSubmit} style={styles.imgBackground1}>
              <Text style={styles.supportMoneyBtnText}>후원하기</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    wordBreak: "break-all",
    alignItems: "center",
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  joinContent: {
    width: "87%",
    height: "90%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    top: "7%",
  },
  supportMoneyTitleView: {
    height: "22%",
  },
  supportMoneyImg: {
    width: 72,
    height: 72,
    marginBottom: '2%',
  },
  supportMoneyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 4,
    color: "#1B3974",
  },
  inputView: {
    height: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "30%",
  },
  supportMoneyInput: {
    width: "120%",
    height: "12%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  inputTitle: {
    height: "100%",
    marginVertical: "5%",
    color: "grey",
    fontSize: 14,
    lineHeight: 20,
    // borderWidth: 1,
  },
  textForm: {
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    fontSize: 16,
    fontWeight: "300",
    paddingBottom: "2%",
    marginTop: "2%",
    height: "100%",
    width: "60%",
  },
  supportMoneyBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
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
    height: "10%",
    marginBottom: "5%",
  },
  imgBackground1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    color: "white",
    boxShadow: "2px 3px 3px rgba(117, 147, 106, 0.2)",
    width: "100%",
    height: "100%",
  },
  imgBackgroundBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hightlight: {
    marginTop: "5%",
    height: "10%",
    justifyContent: "flex-end",
  },
  hightBlock: {
    position: "relaabtive",
    display: "flex",
    width: "66%",
    height: "10%",
    backgroundColor: "rgba(178, 213, 255, 0.83)",
    zIndex: 0,
    // marginTop: "3%",
    paddingTop: "3%",
  },
  hightText: {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 3,
    position: "absolute",
  },
  next: {
    height: "5%",
    width: "25%",
    marginTop: "3%",
    justifyContent: "center",
  },
  nextText: {
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
