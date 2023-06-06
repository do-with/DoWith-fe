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
  const { user } = useContext(AuthContext);

  const [money, setMoney] = useState(0); // 기부금 get
  const [count, setCount] = useState(0); // 참여자 수 get
  const [localTradeList, setLocalTradeList] = useState("");

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/local-trade/user-count`)
      .then((response) => setCount(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/local-trade/price-count`)
      .then((response) => setMoney(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/local-trade/region/${user.region}`)
      .then((response) => {
        setLocalTradeList(response.data);
      })
      .catch((error) => console.log(error));
  }, [localTradeList]);

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
          marginBottom: "3%",
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
            <View style={{ width: "100%", height: "100%", padding: "5%" }}>
              <Image
                source={{
                  uri: localTrade.image1,
                }}
                resizeMode="contain"
                style={{
                  aspectRatio: 1,
                  borderRadius: 8,
                }}
              />

              <View style={{ paddingTop: "5%", paddingLeft: "3%" }}>
                <Text style={styles.nameText}>{localTrade.name}</Text>
                <Text style={styles.dateText}>
                  {Moment(localTrade.created_at).format("MM.DD")}
                </Text>
                {localTrade.sold_yn ? (
                  <Text style={styles.priceText}>판매완료</Text>
                ) : (
                  <Text style={styles.priceText}>
                    {localTrade.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </Text>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    ));
  };
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

  const getAreaString = (areaCode) => {
    return areas.find((area) => areaMappings[area] === areaCode);
  };

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="기부 거래" />
      <View style={styles.joinContent}>
        <View style={styles.highlightSentenceView}>
          <View style={styles.hightlight}>
            <View style={styles.hightBlock}></View>
            <Text style={styles.hightText}>
              “ {getAreaString(user.region)}에서 거래해요 ”
            </Text>
          </View>
        </View>

        <View style={styles.countBoxView}>
          <LinearGradient
            colors={["#fbfbfb57", "#fbfbfba1", "#ffffffd7"]}
            style={styles.countBox}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.bold}>지역 거래 기부금 현재</Text>
              <Text style={styles.bold}>
                {money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </Text>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={["#fbfbfb57", "#fbfbfba1", "#ffffffd7"]}
            style={styles.countBox}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.bold}>
                {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}명이
              </Text>
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
                  width: "95%",
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
                  onPress={() => navigation.navigate("RegisterLocalTrade")}
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
  hightlight: {
    marginTop: "3%",
    height: "25%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  hightBlock: {
    position: "relative",
    display: "flex",
    width: 160,
    height: "10%",
    backgroundColor: "rgba(178, 213, 255, 0.83)",
    zIndex: 0,
    paddingTop: "3%",
  },
  hightText: {
    fontSize: 16,
    fontWeight: 700,
    position: "absolute",
    lineHeight: 17,
    color: "#181818",
  },
  countBoxView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: 'center',
    height: "9%",
    backgroundColor: "rgba(0,0,0,0)",
  },
  countBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "46%",
    marginBottom: "2%",
    borderRadius: 8,
  },
  bold: {
    fontWeight: 700,
  },
  submitBtnView: {
    position: "absolute",
    width: "33%",
    height: "7%",
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
    height: "100%",
    width: "48%",
    marginBottom: "2%",
    borderRadius: 8,
    backgroundColor: "rgba(251, 251, 251, 0.85)",
    shadowColor: "#c9c9c9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.66,
    shadowRadius: 4,
    borderRadius: 10,
    elevation: 4, // elevation 추가
    overflow: "visible", // overflow 추가
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
