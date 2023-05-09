import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from "react-native";
import { Platform } from "react-native";
import { Asset } from "expo-asset";

import { WebView } from "react-native-webview";

const BottomSheet = (props, {}) => {
  const {
    modalVisible,
    setModalVisible,
    name,
    address,
    phone,
    distance,
    longitude,
    latitude,
  } = props;
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const mapUrl =
    "https://dapi.kakao.com/v2/maps/sdk.js?appkey=27ec305b516496a1b6ccfee8a420e520";

  const injectedJS = `
    let MarketLatitude = ${latitude};
    let MarketLongitude = ${longitude};
    window.MarketLatitude = MarketLatitude;
    window.MarketLongitude = MarketLongitude;
  `;

  const marketLatitude = latitude;
  const MarketLongitude = longitude;

  const localHtmlFile = Asset.fromModule(require("../screens/map.html"));
  const localHtmlFilePath = Platform.select({
    ios: localHtmlFile.uri,
    android: localHtmlFile.uri.replace("file://", "file:///android_asset/"),
  });

  const uriWithQuery = `${localHtmlFilePath}?latitude=${marketLatitude}&longitude=${MarketLongitude}`;

  const Map = () => {
    console.log("Map 함수 실행");
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <WebView
          style={{
            maxHeight: 300,
            borderWidth: 1,
            // position: "relateive",
          }}
          source={{ uri: uriWithQuery }}
          originWhitelist={["*"]}
          javaScriptEnabled={true} // JavaScript 활성화
          injectedJavaScript={injectedJS} // 실행시킬 자바스크립트 코드
          onLoad={() => console.log("웹 뷰 로드")}
        />
      </View>
    );
  };
  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View
            style={{
              height: "25%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                height: "75%",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  width: "25%",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: "rgba(35, 35, 35, 0.75)",
                    paddingLeft: "20%",
                  }}
                >
                  {distance}km
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  width: "75%",
                  paddingLeft: "5%",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "rgba(35, 35, 35, 0.82)",
                    fontWeight: 700,
                    fontStyle: "normal",
                    lineHeight: 23,
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgba(35, 35, 35, 0.85)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: 20,
                  }}
                >
                  {address}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  color: "rgba(35, 35, 35, 0.85)",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: 25,
                  paddingLeft: "2%",
                }}
              >
                {phone}
              </Text>
            </View>
          </View>
          <Map />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 500,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default BottomSheet;
