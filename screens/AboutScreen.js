import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Pressable, Text, ScrollView } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { AuthContext } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Variables } from '../components/Variables';

export default function AboutScreen({navigation}){
    const { isAuthenticated } = useContext(AuthContext);
    const [ activeIndex, setActiveIndex ] = useState(0);

    const images = [
        { id: 1, uri: require('../assets/about1.png'), style: {width: 375, height: 648,}, btnText: '5분 만에 기부하러 가기' }, 
        { id: 2, uri: require('../assets/about2.png'), style: {width: 375, height: 740,}, btnText: '지역 기부 거래하러 가기' },
        { id: 3, uri: require('../assets/about3.png'),style: {width: 375, height: 850,}, btnText: '지역 기부 거래하러 가기' }
    ];

    const renderImage = ({ item }) => {
        return (
            <View style={{alignItems: 'center'}}>
                <Image
                    source={item.uri}
                    resizeMode="contain"
                    style={item.style}
                />
                <LinearGradient colors={["#d7eeff66", "#d7eeff"]} style={styles.navigateBtn}>
                    <Pressable onPress={() => onClickBtn('DonateScreen', item.btnText)} style={styles.navigateBtn}>
                        <Text style={styles.navigateText}>{item.btnText}</Text>
                    </Pressable>
                </LinearGradient>
            </View>
        );
    };

    const onClickBtn = (tabName) => {
        if (isAuthenticated) {
            navigation.navigate(tabName);
        }
        else {
            navigation.navigate('LoginScreen');
        }
    };

    return(
        <View style={styles.aboutBody}>
            <ScreenHeader headerTitle="이용방법"/>
            <View style={styles.aboutContent}>
                <ScrollView
                    contentContainerStyle={{ height: 1000 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Carousel
                        data={images}
                        renderItem={renderImage}
                        sliderWidth={370}
                        sliderHeight={300}
                        itemWidth={370}
                        onSnapToItem={(index) => setActiveIndex(index)}
                    />
                    <Pagination
                        dotsLength={images.length}
                        activeDotIndex={activeIndex}
                        containerStyle={styles.paginationContainer}
                        dotStyle={styles.dot}
                        inactiveDotStyle={styles.inactiveDot}
                        inactiveDotScale={1}
                        inactiveDotOpacity={1}
                    /> 
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutBody: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ECF7FF',
        wordBreak: 'break-all',
    },
    aboutContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    img: {
        width: 375,
        height: 648,
        borderColor: '#ECF7FF',
    },
    navigateBtn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "95%",
        height: 70,
        marginBottom: "2%",
        borderRadius: 8,
    },
    navigateText: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0.055,
        color: '#050505',
    },
    paginationContainer: {
        position: "absolute",
        left: -5,
        top: 60,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: Variables.btnColor,
    },
    inactiveDot: {
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: "#ccc",
    },
});