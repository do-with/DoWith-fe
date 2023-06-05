import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";
import { Variables } from "../components/Variables";
import { ipAddress } from "../ipAddress";
import axios from "axios";
import Moment from "moment";
import { AuthContext } from "../contexts/AuthContext";

export default function LocalTrade({ navigation }) {
  const [money, setMoney] = useState(null); // 기부금 get
  const [count, setCount] = useState(null); // 참여자 수 get
  const [localTradeList, setLocalTradeList] = useState("");

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/local-trade`)
      .then((response) => {
        setLocalTradeList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const createColumns = (data, columnsCount) => {
    const columns = [];
    const rowCount = Math.ceil(data.length / columnsCount);

    for (let i = 0; i < rowCount; i++) {
      const startIndex = i * columnsCount;
      const endIndex = startIndex + columnsCount;

      columns.push(data.slice(startIndex, endIndex));
    }

    return columns;
  };

  const renderTradeColumns = () => {
    const columns = createColumns(localTradeList, 2);

    return columns.map((column, columnIndex) => (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "10%",
        }}
        key={columnIndex}
      >
        {column.map((localTrade, index) => (
          <Pressable
            style={styles.tradeBoard}
            key={index}
            onPress={() =>
              navigation.navigate("DetailLocalTrade", { localTrade })
            }
          >
            <View style={{ width: "100%", height: "100%" }}>
              <Image
                source={{
                  uri: localTrade.image1,
                }}
                resizeMode="contain"
                style={{
                  aspectRatio: 1,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />

              <View style={{ paddingTop: "3%" }}>
                <Text style={styles.nameText}>{localTrade.name}</Text>
                <Text style={styles.dateText}>
                  {Moment(localTrade.created_at).format("MM.DD")}
                </Text>
                {localTrade.sold_yn ? (
                  <Text style={styles.priceText}>판매완료</Text>
                ) : (
                  <Text style={styles.priceText}>{localTrade.price}원</Text>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    ));
  };

  const {isAuthenticated} = useContext(AuthContext);

  const onNavigateBtnClick = (page) => {
    if (isAuthenticated) {
      navigation.navigate(page);
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="기부 거래" />
      <View style={styles.joinContent}>
        <View style={styles.highlightSentenceView}>
          <View style={styles.highlightSentence}>
            <View style={styles.hightBlock}>
              <Text style={{ fontSize: 14, lineHeight: 17, fontWeight: 600, color: '#181818' }}>
                " 판매 금액이 어디로 전달되는지 보러가기 "
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.countBoxView}>
          <LinearGradient
            colors={["#fbfbfb57", "#fbfbfba1", "#ffffffd7"]}
            style={styles.countBox}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.bold}>지역 거래 기부금 현재</Text>
              <Text style={styles.bold}>512,000{money}원</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={["#fbfbfb57", "#fbfbfba1", "#ffffffd7"]}
            style={styles.countBox}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.bold}>525{count}명이</Text>
              <Text style={styles.bold}>함께 해주셨어요</Text>
            </View>
          </LinearGradient>
        </View>

        {true && (
          <View style={{ position: "relative" }}>
            <ScrollView
              contentContainerStyle={{
                paddingTop: "3%",
                paddingBottom: "75%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: "90%",
                  justifyContent: "center",
                }}
              >
                {renderTradeColumns()}
              </View>
            </ScrollView>

            <View style={styles.submitBtnView}>
              <LinearGradient
                colors={["#003c7c", "#003c7c", "#003c7cc2"]}
                style={styles.submitBtn}
              >
                <Pressable
                  style={styles.submitBtn}
                  onPress={() => onNavigateBtnClick("RegisterLocalTrade")}
                >
                  <Text style={styles.submitBtnText}>올리기</Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    backgroundColor: Variables.mainColor,
    wordBreak: "break-all",
  },
  joinContent: {
    width: "100%",
    height: "100%",
    position: "relative",
    top: "14%",
  },
  highlightSentenceView: {
    width: "100%",
    height: "8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  highlightSentence: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    height: "30%",
    boxSizing: "border-box",
  },
  hightBlock: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "75%",
    height: 18,
    display: "flex",
    backgroundColor: "rgba(178, 213, 255, 0.83)",
    zIndex: 0,
  },
  countBoxView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: 'center',
    height: "12%",
    backgroundColor: "rgba(0,0,0,0)",
  },
  countBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    marginBottom: "2%",
    borderRadius: 8,
  },
  bold: {
    fontWeight: 700,
  },
  submitBtnView: {
    position: "absolute",
    width: "40%",
    height: "8%",
    right: "5%",
    bottom: "36%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  submitBtn: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  submitBtnText: {
    fontWeight: 700,
    fontSize: 23,
    lineHeight: 28,
    letterSpacing: 3,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.36)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
  tradeBoard: {
    flexDirection: "row",
    alignItems: "center",
    height: "110%",
    width: "48%",
    marginBottom: "2%",
    borderRadius: 8,
    backgroundColor: "rgba(251, 251, 251, 0.35)",
    shadowColor: "#c9c9c9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    borderRadius: 10,
  },
  nameText: {
    fontWeight: 600,
    fontSize: 13,
    lineHeight: 16,
    color: "rgba(0, 0, 0, 0.75)",
  },
  dateText: {
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 16,
    color: "rgba(0, 0, 0, 0.55)",
  },
  priceText: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    color: "rgba(0, 0, 0, 0.8)",
  },
});
