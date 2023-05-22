import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import BottomSheet from "../components/BottomSheet";
import BottomSheet2 from "../components/BottomSheet2";
import * as Location from "expo-location";
import { ipAddress } from "../ipAddress";
import axios from "axios";

export default function NearByStore() {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getMarketListById();
  }, []);

  const getCurrentLocation = () => {
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      text = JSON.stringify(location);
      //text에 location값이 저장된다.
      console.log("latitude : ", latitude);
      console.log("longitude : ", longitude);
      setLoading(false);
    }
    axios
      .get(`http://${ipAddress}:8080/market/distance/${latitude}/${longitude}`)
      .then((response) => setMarketList(response.data))
      .catch((error) => console.log(error));
    console.log(marketList);
  };

  const [marketList, setMarketList] = useState([]);
  const [marketListById, setMarketListById] = useState([]);

  const getMarketListById = () => {
    axios
      .get(`http://${ipAddress}:8080/market`)
      .then((response) => setMarketListById(response.data))
      .catch((error) => console.log(error));
  };

  return loading ? (
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
            {marketListById.map((market) => {
              return (
                <View key={market.id}>
                  <Pressable onPress={() => setModalVisible(market.id)}>
                    <View style={[styles.listBoxImg, styles.listBoxImgApi]}>
                      <View
                        style={[
                          styles.contentListText,
                          styles.contentListTextApi,
                        ]}
                      >
                        <View
                          style={{
                            height: "60%",
                            justifyContent: "space-between",
                            marginTop: "2%",
                          }}
                        >
                          <Text style={{ fontSize: 15, fontWeight: 700 }}>
                            {market.name}
                          </Text>
                          <Text>{market.address}</Text>
                          <Text>{market.phone}</Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                  <BottomSheet2
                    modalVisible={modalVisible === market.id}
                    setModalVisible={setModalVisible}
                    name={market.name}
                    address={market.address}
                    phone={market.phone}
                    longitude={market.longitude}
                    latitude={market.latitude}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  ) : (
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
            {marketList.map((market) => {
              const dist = Math.round(market.distance * 100) / 100;
              return (
                <View key={market.id}>
                  <Pressable onPress={() => setModalVisible(market.id)}>
                    <View style={[styles.listBoxImg, styles.listBoxImgApi]}>
                      <View
                        style={[
                          styles.contentListText,
                          styles.contentListTextApi,
                        ]}
                      >
                        <View
                          style={{
                            height: "60%",
                            justifyContent: "space-between",
                            marginTop: "2%",
                          }}
                        >
                          <Text style={{ fontSize: 15, fontWeight: 700 }}>
                            {market.name}
                          </Text>
                          <Text>{market.address}</Text>
                          <Text>{market.phone}</Text>
                        </View>

                        <Text style={{ color: "grey" }}>{dist}km</Text>
                      </View>
                    </View>
                  </Pressable>
                  <BottomSheet
                    modalVisible={modalVisible === market.id}
                    setModalVisible={setModalVisible}
                    name={market.name}
                    address={market.address}
                    phone={market.phone}
                    distance={dist}
                    longitude={market.longitude}
                    latitude={market.latitude}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
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
    width: "100%",
  },
  contentListWrapApi: {
    backgroundColor: "white",
    height: "63%",
    width: "100%",
  },
  listBoxImg: {
    borderBottomWidth: 3,
    borderBottomColor: "#d8d8d8",
    display: "flex",
    wordBreak: "break-all",
    justifyContent: "center",
    paddingHorizontal: "3%",
  },
  listBoxImgApi: {
    marginTop: "3%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(199, 199, 199, 0.8)",
    boxShadow: "1px 1px 4px rgba(189, 189, 189, 0.25)",
    borderRadius: 10,
    width: "95%",
    height: 105,
    wordBreak: "break-all",
    marginLeft: "3%",
  },
  contentListText: {
    width: "100%",
    display: "flex",
    height: "90%",
    flexDirection: "column",
    justifyContent: "space-around",
    boxSizing: "border-box",
  },
  contentListTextApi: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: "2%",
    color: "rgba(35, 35, 35, 0.94)",
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
