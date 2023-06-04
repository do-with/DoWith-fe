import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Moment from "moment";
import { ScreenHeader } from "../components/ScreenHeader";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Variables } from "../components/Variables";

const windowWidth = Dimensions.get("window").width;

const DetailLocalTrade = ({ route }) => {
  const { localTrade } = route.params;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const images = [{ uri: localTrade.image1 }, { uri: localTrade.image2 }];

  const renderImage = ({ item }) => {
    return (
      <Image
        source={item}
        resizeMode="contain"
        style={{ width: 390, height: 390 }}
      />
    );
  };

  

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="기부 거래" />
      <View style={styles.joinContainer}>
        <View style={styles.imageContainer}>
          <Carousel
            data={images}
            renderItem={renderImage}
            sliderWidth={windowWidth}
            sliderHeight={390}
            itemWidth={390}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
          <Pagination
            dotsLength={2}
            activeDotIndex={activeIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.dot}
            inactiveDotStyle={styles.inactiveDot}
            inactiveDotScale={1}
            inactiveDotOpacity={1}
        />
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.profileView}>
            <Image source={require('../assets/user.png')}
              resizeMode={'contain'}
              style={{width: 45, height: 45, marginRight: '3%',}}/>
            <Text style={styles.profileText}>한진주 님</Text>
          </View>

          <View style={styles.itemView}>
            <View style={{height: '15%',}}>
              <Text style={styles.itemTitleText}>
                {localTrade.name}
              </Text>
            </View>
            
            <View style={styles.infoView}>
              <Text style={styles.infoText}>
                대분류 | {Moment(localTrade.created_at).format("MM.DD")}
              </Text>
            </View>
            <View style={styles.detailView}>
              <Text style={styles.detailText}>{localTrade.describe}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomView}>
            <Text style={styles.priceText}>{localTrade.price}원</Text>
            <View style={styles.bottomBtnView}>
              <Text style={styles.bottomBtnText}>{localTrade.sold_yn ? "판매완료" : "판매 중"}</Text>
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  joinContainer: {
    width: "100%",
    top: "14%",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "45%",
    alignItems: "center",
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -15,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  inactiveDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#aaa',
  },
  itemContainer: {
    width: '90%',
  },
  profileView: {
    width: '100%',
    height: '14%',
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    fontWeight: 600,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  itemView: {
    height: '42%',
  },
  itemTitleText: {
    fontWeight: 700,
    fontSize: 23,
    lineHeight: 26,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '15%',
    marginBottom: '5%',
  },
  infoText: {
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 18,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  detailView: {
    width: '100%',
  },
  detailText: {
    fontWeight: 400,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  bottomView: {
    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: '8%',
    borderTopWidth: 1,
    borderTopColor: '#aaa',
  },
  bottomBtnView: {
    backgroundColor: Variables.btnColor,
    borderRadius: 5,
    width: '28%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 26,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  bottomBtnText: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 26,
    color: '#fff',
  },
});

export default DetailLocalTrade;
