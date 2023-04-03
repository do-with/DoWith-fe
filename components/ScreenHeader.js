import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Variables } from './Variables';
import { Link } from "react-router-native";
// import {vw, vh} from 'react-native-viewport-units';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ScreenHeader(){
    const isLargeScreen = windowWidth >= 720;
    return(
        <View style={styles.screenHeader}>
            <TouchableOpacity style={styles.screenHeaderTitle} href="#">
                <Image source={require('../assets/logo.png')}
                        style={styles.logo} resizeMode='contain' />
            </TouchableOpacity>
            <View>
                <Text>기부하기</Text>
            </View>
            <View style={styles.screenHeaderBtn}>
                <TouchableOpacity href="">
                    <Image source={require('../assets/notification.png')}
                    style={styles.screenHeaderBtnImg} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: windowWidth * 0.07,
        height: windowHeight * 0.045,
    },
    screenHeader: {
        width: '100%',
        height: '12%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: Variables.mainColor,
        borderRadius: 15,
        alignItems: 'center',
    },
    screenHeaderTitle: {
        marginRight: '15%',
        marginLeft: '4%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.2,
        // backgroundColor: '#fff',
    },
    screenHeaderBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '19%',
        height: 'auto',
    },
    screenHeaderBtnImg: {
        width: windowWidth * 0.07,
        height: windowHeight * 0.045,
    },
});