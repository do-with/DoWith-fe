import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Pressable, Image, ScrollView} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import BottomSheet from "../components/BottomSheet";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { ipAddress } from "../ipAddress";
import axios from "axios";


export default function NearByStore() {
  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  }

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
	}, []);

  const getCurrentLocation = () => {
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      text = JSON.stringify(location);
      //text에 location값이 저장된다.
      console.log("latitude : ",latitude);
      console.log("longitude : ",longitude);
    }
    axios
      .get(`http://${ipAddress}:8080/market/distance/${latitude}/${longitude}`)
      .then((response) => setMarketList(response.data))
      .catch((error) => console.log(error));
      console.log(marketList);
  };
  
  const [marketList, setMarketList] = useState([]);
  //test 코드
  marketList.name = "매장이름";
  marketList.address = "주소";
  marketList.phone = "전화번호";
  marketList.distance = "거리";
  marketList.longitude = "126.56747518962283";
  marketList.latitude = "33.4478231507773";
  return (
    <View style={styles.nearByBody}>
      <ScreenHeader headerTitle="가까운 매장" />
      <View style={styles.nearByContent}>
        <View style={styles.nearByImgBackground}>
          <Image
            source={require("../assets/nearby-background.png")}
            style={styles.img}
            resizeMode={"contain"}
          />
          <LinearGradient
            colors={["#4A6BAC", "#1B3974"]}
            style={styles.imgBackground}
          >
            <Pressable
              style={styles.imgBackgroundBtn}
              onPress={getCurrentLocation}
            >
              <Text style={{ color: "white" }}>현위치</Text>
            </Pressable>
          </LinearGradient>
        </View>
        <View style={styles.contentListWrapApi}>
          <ScrollView>
            <Pressable onPress={pressButton}>
              <View style={[styles.contentList, styles.contentListApi]}>
                {/* {marketList.map((marketList) => {
                  const dist = Math.round(marketList.distance * 100) / 100;
                  return (
                    <View
                      style={[styles.listBoxImg, styles.listBoxImgApi]}
                      key={marketList.id}
                    >
                      <View
                        style={[
                          styles.contentListText,
                          styles.contentListTextApi,
                        ]}
                      >
                        <Text>{marketList.name}</Text>
                        <Text>{marketList.address}</Text>
                        <Text>{marketList.phone}</Text>
                        <Text>{dist}km</Text>
                      </View>
                    </View>
                  );
                })} */}
                <View style={[styles.listBoxImg, styles.listBoxImgApi]}>
                  <View
                    style={[styles.contentListText, styles.contentListTextApi]}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginTop: "5%",
                      }}
                    >
                      매장이름
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "grey",
                        marginTop: "3%",
                      }}
                    >
                      거리km
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: "10%" }}>
                      전화번호
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </ScrollView>
          {/* <Map /> */}
        </View>

        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          name={marketList.name}
          address={marketList.address}
          phone={marketList.phone}
          distance={marketList.distance}
          longitude={marketList.longitude}
          latitude={marketList.latitude}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nearByBody: {
    width: "100%",
    height: "100%",
    wordWrap: "break-word",
  },
  nearByContent: {
    position: "relative",
    width: "100%",
    height: "100%",
    top: "13%",
    backgroundColor: "#fff",
  },
  nearByImgBackground: {
    position: "relative",
    width: "100%",
    height: "22%",
    display: "flex",
    alignItems: "center",
    backgroundColor: Variables.mainColor,
  },
  img: {
    left: "1%",
    position: "relative",
    top: "4%",
  },
  imgBackground: {
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
    position: "absolute",
    width: "23%",
    height: "23%",
    right: 21,
    bottom: 11,
  },
  imgBackgroundBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentListWrap: {
    position: "relative",
    width: "100%",
    height: "auto",
    
  },
  contentListWrapApi: {
    backgroundColor: "white",
    height: 500,
  },
  contentList: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  contentListApi: {
    alignItems: "center",
  },

  listBoxImg: {
    width: "100%",
    height: 124,
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    display: "flex",
    wordBreak: "break-all",
  },
  listBoxImgApi: {
    marginTop: "3%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(199, 199, 199, 0.8)",
    boxShadow: "1px 1px 4px rgba(189, 189, 189, 0.25)",
    borderRadius: 10,
    width: "93%",
    height: 117,
    wordBreak: "break-all",
  },

  contentListText: {
    width: "61%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    paddingLeft: "6%",
    paddingTop:"2%"
  },
  contentListTextApi: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: "2%",
    color: "rgba(35, 35, 35, 0.94)",
  },

  contentListImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "37%",
  },
  contentListImgApi: {
    width: "41%",
  },

  nearbyAddress: {
    position: "relative",
    width: 345,
    height: 74,
    marginTop: "5%",
    marginBottom: "5%",
    border: "1px solid #FFFFFF",
    backgroundColor: "#FEFEFE",
    boxShadow:
      "0px 2px 3px rgba(0, 0, 0, 0.02), 0px 4px 50px rgba(0, 1, 1, 0.07)",
    borderRadius: 24,
  },
});