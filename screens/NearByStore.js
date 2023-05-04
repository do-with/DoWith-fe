import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
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
  const mapUrl = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=27ec305b516496a1b6ccfee8a420e520";

  const injectedJavaScript = `
    const script = document.createElement("script");
    script.async = true;
    script.src = '${mapUrl}';
    document.head.appendChild(script);

    script.addEventListener("load", ()=>{
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 8, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      })
    })`;

  const Map = () => {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={{ width: "100%", height: "100%"}}
          source={require("./map.html")}
          originWhitelist={["*"]}
          javaScriptEnabled={true} // JavaScript 활성화
          injectedJavaScript={injectedJavaScript} // 실행시킬 자바스크립트 코드
        />
      </View>
    );
  };

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
    console.log("getCurrentLocation");
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
    // axios
    //   .get(`http://${ipAddress}:8080/market/distance/${latitude}/${longitude}`)
    //   .then((response) => setMarketList(response.data))
    //   .catch((error) => console.log(error));
    // console.log(marketList);
  };
  
  const [marketList, setMarketList] = useState([]);
  
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
          <Pressable onPress={pressButton}>
            <View style={[styles.contentList, styles.contentListApi]}>
              <View style={[styles.listBoxImg, styles.listBoxImgApi]}>
                <View
                  style={[styles.contentListText, styles.contentListTextApi]}
                >
                  <Text>푸드뱅크 이름</Text>
                  <Text>거리</Text>
                  <Text>전화번호</Text>
                </View>
                <View style={[styles.contentListImg, styles.contentListImgApi]}>
                  <Text>json(아마 지도?)</Text>
                </View>
              </View>
            </View>
          </Pressable>
          <Map />
        </View>

        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    nearByBody:{
        width: '100%',
        height: '100%',
        wordWrap: 'break-word',
    },
    nearByContent: {
      position: 'relative',
      width: '100%',
      height: '88%',
      top: '13%',
      backgroundColor: Variables.mainColor,
    },
    nearByImgBackground: {
      position: 'relative',
      width: '100%',
      height: '22%',
      display: 'flex',
      alignItems: 'center',
    },
    img: {
      left: '1%',
      position: 'relative',
      top: '4%',
    },
    imgBackground: {
      borderTopWidth: 1,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderLeftWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(13, 27, 43, 0.35)',
      borderRadius: 5,
      fontWeight: '700',
      fontSize: 15,
      textAlign: 'center',
      color: 'white',
      boxShadow: '2px 3px 3px rgba(117, 147, 106, 0.2)',
      position: 'absolute',
      width: '23%',
      height: '23%',
      right: 21,
      bottom: 11,
    },
    imgBackgroundBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    contentListWrap: {
      position: 'relative',
      width: '100%',
      height: 'auto',
    },
    contentListWrapApi: {
      backgroundColor: 'white',
      height: '75%',
    },

    contentList: {
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
    },
    contentListApi: {
      alignItems: 'center',
    },

    listBoxImg: {
      width: '100%',
      height: 124,
      borderBottomWidth: 1,
      borderBottomColor: '#d8d8d8',
      display: 'flex',
      wordBreak: 'break-all',
    },
    listBoxImgApi: {
      marginTop: '3%',
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(199, 199, 199, 0.8)',
      boxShadow: '1px 1px 4px rgba(189, 189, 189, 0.25)',
      borderRadius: 10,
      width: '93%',
      height: 117,
      wordBreak: 'break-all',
    },

    contentListText: {
      width: '61%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box',
      paddingLeft: '6%',
    },
    contentListTextApi: {
      fontSize: 17,
      fontWeight: '700',
      marginBottom: '2%',
      color: 'rgba(35, 35, 35, 0.94)',
    },

    contentListImg: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '37%',
    },
    contentListImgApi: {
      width: '41%',
    },

    nearbyAddress: {
      position: 'relative',
      width: 345,
      height: 74,
      marginTop: '5%',
      marginBottom: '5%',
      border: '1px solid #FFFFFF',
      backgroundColor: '#FEFEFE',
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.02), 0px 4px 50px rgba(0, 1, 1, 0.07)',
      borderRadius: 24,
    },
});