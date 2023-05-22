import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { Variables } from "../components/Variables";
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

  return (
    <View style={styles.joinBody}>
      <View style={styles.joinContent}>
        <Pressable onPress={onSubmit} style={styles.next}>
          <Text style={styles.nextText}>다음에 하기</Text>
        </Pressable>
        <View style={styles.supportMoneyTitleView}>
          <Image
            source={require("../assets/donator.png")}
            style={styles.supportMoneyImg}
            resizeMode={"contain"}
          />
          <Text style={styles.supportMoneyTitle}>
            푸드뱅크에 {"\n"}후원하기
          </Text>
        </View>

        <View style={styles.inputView}>
          <View style={styles.supportMoneyInput}>
            <Text style={styles.inputTitle}>후원 포인트 * </Text>
            <TextInput
              value={point}
              onChangeText={setPoint}
              placeholder="후원 포인트 입력"
              style={styles.textForm}
            />
          </View>
          <View style={styles.supportMoneyInput}>
            <Text style={styles.inputTitle}>기부자 닉네임 *</Text>
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
          <Pressable onPress={onSubmit} style={styles.imgBackgroundBtn}>
            <Text style={styles.supportMoneyBtnText}>후원하기</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
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
  joinContent: {
    width: "87%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  supportMoneyTitleView: {
    height: "22%",
  },
  supportMoneyImg: {
    width: 60,
    height: 60,
  },
  supportMoneyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 2,
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
    marginVertical: "4%",
  },
  inputTitle: {
    height: "100%",
    marginVer: "5%",
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
  supportMoneyBtnView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "6%",
    backgroundColor: Variables.btnColor,
    borderRadius: 5,
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
    width: "80%",
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
    height: "10%",
    marginTop: "3%",
  },
  nextText: {
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
