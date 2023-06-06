import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";
import { Variables } from "../components/Variables";
import { ipAddress } from "../ipAddress";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

function MainScreen({ navigation }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/user/count`)
      .then((response) => setCount(response.data))
      .catch((error) => console.log(error));
  }, []);

  const onNavigateBtnClick = (page) => {
    if (isAuthenticated) {
      navigation.navigate(page);
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <View style={styles.mainBody}>
      <ScreenHeader headerTitle="DoWith" />
      <View style={styles.mainContent}>
        <View style={styles.mainContentTotalDonor}>
          <View style={styles.highlightSentence}>
            <View style={styles.hightlight}>
              <View style={styles.hightBlock}></View>
              <Text style={styles.hightText}>
                “ 많은 사람들이 푸드뱅크 기부에 참여하고 있어요 ”
              </Text>
            </View>
            <Text style={styles.totalDonorCount}>
              {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}명
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.contentCategory}>
            <TouchableOpacity
              style={styles.transImgBtn}
              onPress={() => navigation.navigate("NearByStore")}
            >
              <Image
                source={require("../assets/store.png")}
                style={styles.img}
                resizeMode={"contain"}
              />
              <Text style={styles.menuText}>가까운 매장</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.transImgBtn}
              onPress={() => navigation.navigate("Announce1")}
            >
              <Image
                source={require("../assets/notice.png")}
                style={styles.img}
                resizeMode={"contain"}
              />
              <Text style={styles.menuText}>알림 마당</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.transImgBtn}
              onPress={() => navigation.navigate("Static")}
            >
              <Image
                source={require("../assets/donateSitu.png")}
                style={styles.img}
                resizeMode={"contain"}
              />
              <Text style={styles.menuText}>기부 현황</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentCategory}>
            <TouchableOpacity
              style={styles.transImgBtn}
              onPress={() => navigation.navigate("AboutScreen")}
            >
              <Image
                source={require("../assets/menual.png")}
                style={styles.img}
                resizeMode={"contain"}
              />
              <Text style={styles.menuText}>이용 방법</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.transImgBtn}
              onPress={() => navigation.navigate("FirstCsPage")}
            >
              <Image
                source={require("../assets/ask.png")}
                style={styles.img}
                resizeMode={"contain"}
              />
              <Text style={styles.menuText}>문의하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.transImgBtn}
              onPress={() => onNavigateBtnClick("SupportMoney")}
            >
              <Image
                source={require("../assets/burger.png")}
                style={styles.img}
                resizeMode={"contain"}
              />
              <Text style={styles.menuText}>후원하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentMine}>
          <LinearGradient
            colors={["#2992be", "#2A93BF", "#3b5998"]}
            style={styles.localTradeBtn}
          >
            <Pressable
              onPress={() => navigation.navigate("LocalTrade")}
              style={styles.localTradeBtn1}
            >
              <View style={styles.bigBtnText}>
                <Text style={styles.localTradeBtnText}>우리 동네</Text>
                <Text style={styles.localTradeBtnText}>기부 거래</Text>
              </View>
              <View style={styles.bigBtnImg}>
                <Image
                  source={require("../assets/local-trade1.png")}
                  resizeMode="contain"
                  style={{ width: 65, height: 65 }}
                />
              </View>
            </Pressable>
          </LinearGradient>

          <Pressable
            style={styles.donationBtn}
            onPress={() => onNavigateBtnClick("DonateScreen")}
          >
            <View style={styles.bigBtnText}>
              <Text style={styles.donationBtnText}>5분 만에</Text>
              <Text style={styles.donationBtnText}>기부 접수</Text>
            </View>
            <View style={styles.bigBtnImg}>
              <Image
                source={require("../assets/image18.png")}
                resizeMode="contain"
                style={{ width: 55, height: 55 }}
              />
            </View>
          </Pressable>
        </View>

        {/* <View style={styles.tokenDonateView}>
          <LinearGradient
            colors={["#b2d5ffd4", "#D7EEFF"]}
            style={styles.tokenDonate}
          >
            <Pressable
              onPress={() => navigation.navigate("SupportMoney")}
              style={styles.tokenDonate}
            >
              <Text style={styles.supportMoneyBtn}>포인트 기부하기</Text>
            </Pressable>
          </LinearGradient>
        </View> */}
      </View>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  mainBody: {
    color: "transparent",
  },
  transImgBtn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    height: "35%",
  },
  img: {
    width: 55,
    height: 55,
  },
  menuText: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 23,
    color: "rgba(0, 0, 0, 0.68)",
  },
  mainContent: {
    height: "95%",
    width: "100%",
    top: "14%",
    position: "relative",
    backgroundColor: Variables.mainColor,
  },
  mainContentTotalDonor: {
    width: "100%",
    height: "17%",
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
  totalDonorCount: {
    display: "flex",
    justifyContent: "center",
    marginTop: 9,
    fontSize: 23,
    color: "black",
    fontWeight: 600,
    lineHeight: 33,
    color: "rgba(0, 0, 0, 0.77)",
  },
  hightlight: {
    marginTop: "5%",
    height: "10%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  hightBlock: {
    position: "relative",
    display: "flex",
    width: 350,
    height: "10%",
    backgroundColor: "rgba(178, 213, 255, 0.83)",
    zIndex: 0,
    paddingTop: "3%",
  },
  hightText: {
    fontSize: 17,
    fontWeight: 600,
    lineHeight: 18,
    position: "absolute",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
    height: "33%",
    position: "relative",
    backgroundColor: "white",
  },
  contentCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    height: "32%",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    boxShadow: "1px 2px 4px rgba(70, 70, 70, 0.2)",
  },
  contentMine: {
    position: "relative",
    width: "100%",
    height: "35%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  localTradeBtn: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
    height: "70%",
    justifyContent: "center",
    borderRadius: 8,
    color: "rgba(0, 0, 0, 0.63)",
    shadowColor: "rgba(166, 171, 189, 0.51)",
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  localTradeBtn1: {
    width: "100%",
    height: "88%",
    marginTop: "5%",
    justifyContent: "space-around",
  },
  localTradeBtnText: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 21,
    lineHeight: 30,
  },
  bigBtnText: {
    width: "100%",
    marginLeft: "10%",
  },
  bigBtnImg: {
    alignItems: "center",
  },
  donationBtn: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
    height: "70%",
    borderRadius: 10,
    justifyContent: "space-evenly",
    shadowColor: "#B6B6B6",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    backgroundColor: "#fff",
    shadowOpacity: 0.33,
    shadowRadius: 3,
    elevation: 3,
  },
  donationBtnText: {
    color: "#646464",
    fontWeight: 700,
    fontSize: 21,
    lineHeight: 30,
  },
  contentBtn: {
    width: "40%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tokenDonateView: {
    display: "flex",
    alignItems: "center",
  },
  tokenDonate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "30%",
    borderRadius: 5,
  },
  supportMoneyBtn: {
    fontWeight: 500,
    fontSize: 18,
  },
});
