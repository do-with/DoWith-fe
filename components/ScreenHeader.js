import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Variables } from './Variables';
import { Link } from "react-router-native";
// import {vw, vh} from 'react-native-viewport-units';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ScreenHeader({navigation}){
    const isLargeScreen = windowWidth >= 720;
    return(
        <View style={styles.screenHeader}>
            <View style={styles.screenHeaderView}>
                <View style={styles.screenHeaderTitleView}>
                    <TouchableOpacity style={styles.screenHeaderTitle} href="">
                        <Image source={require('../assets/logo.png')}
                                style={styles.logo} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                <View style={styles.screenHeaderBtn}>
                    <TouchableOpacity href="">
                        <Image source={require('../assets/notification.png')}
                        style={styles.screenHeaderBtnImg} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: windowWidth * 0.06,
        height: windowHeight * 0.03,
    },
    screenHeader: {
        width: '100%',
        height: '14%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: Variables.mainColor,
        // borderRadius: 15,
        alignItems: 'center',
    },
    screenHeaderTitle: {
        marginRight: '15%',
        marginLeft: '4%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    screenHeaderBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '19%',
        height: 'auto',
        marginRight: '5%',
    },
    screenHeaderBtnImg: {
        width: windowWidth * 0.07,
        height: windowHeight * 0.045,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    screenHeaderView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '10%',
    },
    screenHeaderTitleView: {
        marginLeft: '4%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});