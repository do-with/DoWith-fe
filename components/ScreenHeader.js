import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, Pressable } from 'react-native';
import { Variables } from './Variables';
import { useNavigation } from '@react-navigation/native';

// import {vw, vh} from 'react-native-viewport-units';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ScreenHeader = ({headerTitle}) => {
    const navigation = useNavigation();
    return(
        <View style={styles.screenHeader}>
            <View style={styles.screenHeaderView}>
                <View style={styles.screenHeaderTitleView}>
                    <TouchableOpacity style={styles.screenHeaderTitle}
                        onPress={() => navigation.navigate("MainScreen")}>
                        <Image source={require('../assets/logo.png')}
                                style={styles.logo} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.headerTitleText}>{headerTitle}</Text>
                </View>
                <View style={styles.icon}>
                    <View style={styles.screenHeaderBtn}>
                        <Pressable onPress={() => navigation.push("Notification")}>
                            <Image source={require('../assets/notification.png')}
                            style={styles.screenHeaderBtnImg} resizeMode='contain' />
                        </Pressable>
                    </View>
                    <View style={styles.screenHeaderBtn}>
                        <Pressable onPress={() => navigation.push('MyPage')}>
                            <Image source={require('../assets/search.png')}
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
    screenHeaderView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '10%',
        alignItems: 'center',
    },
    screenHeaderTitleView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleText: {
        fontWeight: 700,
        fontSize: 19,
        color: Variables.btnColor,
    },
    icon: {
        width: '20%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: '4%',
        marginRight: '4%',
    },
    screenHeaderBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',
        marginRight: '25%', 
    },
    screenHeaderBtnImg: {
        width: 30,
        height: 30,
    },
});