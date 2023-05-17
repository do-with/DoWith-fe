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
  Pressable,
} from "react-native";

import { WebView } from "react-native-webview";
import Communications from "react-native-communications";

const BottomSheet2 = (props, {}) => {
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

  const makePhoneCall = (phoneNumber) => {
    Communications.phonecall(phoneNumber, true);
  };

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

  const injectedJS = `
  let MarketLatitude = ${latitude};
  let MarketLongitude = ${longitude};
  window.MarketLatitude = MarketLatitude;
  window.MarketLongitude = MarketLongitude;
  `;
  const Map = () => {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <WebView
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
          }}
          source={require("../screens/map.html")}
          originWhitelist={["*"]}
          javaScriptEnabled={true} // JavaScript 활성화
          injectedJavaScript={injectedJS} // 실행시킬 자바스크립트 코드
          injectedJavaScriptBeforeContentLoaded={injectedJS}
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
          <View style={styles.marketView}>
            <View style={styles.marketTitleView}>
              <View style={styles.marketTextView}>
                <Text style={styles.titleText}>{name}</Text>
                <Text style={styles.etcText}>{address}</Text>
                <Pressable onPress={() => makePhoneCall(phone)}>
                  <Text style={styles.etcText}>{phone}</Text>
                </Pressable>
              </View>
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
    height: "70%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  marketView: {
    height: "25%",
    display: "flex",
    flexDirection: "column",
  },
  marketTitleView: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  marketTextView: {
    justifyContent: "center",
    width: "95%",
    paddingHorizontal: "3%",
  },
  titleText: {
    fontSize: 16,
    color: "rgba(35, 35, 35, 0.82)",
    fontWeight: 700,
    fontStyle: "normal",
    lineHeight: 23,
  },
  etcText: {
    fontSize: 14,
    color: "rgba(35, 35, 35, 0.85)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 20,
  },
});

export default BottomSheet2;
