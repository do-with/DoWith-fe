import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, Pressable } from 'react-native';
import { Variables } from './Variables';
import { useNavigation } from '@react-navigation/native';

// import {vw, vh} from 'react-native-viewport-units';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ScreenHeader = ({headerTitle}) => {
    const isLargeScreen = windowWidth >= 720;
    const navigation = useNavigation();
    return(
        <View style={styles.screenHeader}>
            <View style={styles.screenHeaderView}>
                <View style={styles.screenHeaderTitleView}>
                    <TouchableOpacity style={styles.screenHeaderTitle} href="">
                        <Image source={require('../assets/logo.png')}
                                style={styles.logo} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.headerTitleText}>{headerTitle}</Text>
                </View>
                <View style={styles.icon}>
                    <View style={styles.screenHeaderBtn}>
                        <Pressable onPress={() => navigation.navigate("Notification")}>
                            <Image source={require('../assets/notification.png')}
                            style={styles.screenHeaderBtnImg} resizeMode='contain' />
                        </Pressable>
                    </View>
                    <View style={styles.screenHeaderBtn}>
                        <Pressable onPress={() => navigation.navigate('MyPage')}>
                            <Image source={require('../assets/notification.png')}
                            style={styles.screenHeaderBtnImg} resizeMode='contain' />
                        </Pressable>
                    </View>
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
        width: '2%',
        height: 'auto',
        marginRight: '50%',
        borderWidth: 1,
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
        alignItems: 'center',
    },
    screenHeaderTitleView: {
        marginLeft: '4%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleText: {
        fontWeight: 'bold',
        color: Variables.btnColor,
    },
    icon: {
        width: '20%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
    }
});