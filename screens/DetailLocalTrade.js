import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Moment from "moment";
import { ScreenHeader } from "../components/ScreenHeader";
import Carousel from "react-native-snap-carousel";

const DetailLocalTrade = ({ route }) => {
  const { localTrade } = route.params;

  const images = [{ uri: localTrade.image1 }, { uri: localTrade.image2 }];

  const renderImage = ({ item }) => {
    return (
      <Image
        source={item}
        resizeMode="contain"
        style={{ width: 250, height: 250, borderRadius: 8 }}
      />
    );
  };

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="기부 거래" />
      <View style={styles.imageView}>
        <Carousel
          data={images}
          renderItem={renderImage}
          sliderWidth={250}
          sliderHeight={250}
          itemWidth={250}
        />
      </View>
      <View style={styles.itemView}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
          {localTrade.name}
        </Text>
        <Text>{Moment(localTrade.created_at).format("MM.DD")}</Text>
        <Text style={{ fontSize: 16 }}>{localTrade.price}원</Text>
        <Text>{localTrade.describe}</Text>
        <Text>{localTrade.sold_yn ? "판매완료" : "판매 중"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    wordBreak: "break-all",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  imageView: {
    width: "100%",
    height: "50%",
    position: "relative",
    top: "18%",
    alignItems: "center",
  },
  itemView: {
    paddingHorizontal: "15%",
  },
});

export default DetailLocalTrade;
