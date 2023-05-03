import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Variables } from '../components/Variables';

export default function DonationList({navigation}){
    const date = new Date();
    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="기부 목록"/>
            <View style={styles.joinContent}>
                <View style={styles.summaryView}>
                    <View style={styles.month}>
                        <Text style={styles.monthText}>{date.getMonth()}월</Text>
                    </View>
                </View>

                <View style={styles.listView}>
                    <View style={styles.settingView}>
                        <View style={styles.settingBtnLeft}>
                            <Pressable style={styles.settingBtn}>
                                <Text>전체</Text>
                            </Pressable>
                            <Pressable style={styles.settingBtn}>
                                <Text>일주일</Text>
                            </Pressable>
                            <Pressable style={styles.settingBtn}>
                                <Text>한달</Text>
                            </Pressable>
                        </View>
                        <Pressable>
                        <Text>직접 설정</Text>
                        </Pressable>
                    </View>
                    
                    <View>
                        <View style={styles.listBoard}>
                            <View style={styles.listBoardHorizontal}>
                                <View style={styles.imgBorder}>
                                    <Image source={require('../assets/donator.png')}
                                        style={styles.img} resizeMode='contain' />
                                </View>
                                <Text style={styles.listBoardTitle}>과자 외</Text>
                                <Text style={styles.gray}>3.31</Text>
                            </View>
                            <Text style={styles.gray}>과자 외 물품이 아동센터에 전달되었어요</Text>
                        </View>
                        
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    joinBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        wordBreak: 'break-all',
    },
    joinContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
    },
    summaryView: {
        height: '20%',
        backgroundColor: Variables.mainColor,
    },
    month: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        width: '30%',
        marginBottom: '2%',
        backgroundColor: Variables.mainColor,
        borderRadius: 8,
        shadowColor: '#fff',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.1,
        elevation: 1,
    },
    monthText: {
        fontWeight: 700,
        fontSize: 28,
        color: Variables.btnColor,
    },
    listView: {
        height: '70%',
    },
    settingView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '7%',
    },
    settingBtnLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingBtn: {
        marginRight: '30%',
    },
    gray: {
        color: 'rgba(35, 35, 35, 0.53)',
    },
    listBoard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        width: '100%',
        marginBottom: '2%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    listBoardHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    imgBorder: {
        borderRadius: 20,
        backgroundColor: 'rgb(255 223 239)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1%',
    },
    img: {
        width: 28,
        height: 28,
    },
    listBoardTitle: {
        fontWeight: 700,
        fontSize: 17,
    },
});