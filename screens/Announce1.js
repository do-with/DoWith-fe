import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';

export default function Announce1({navigation}){
    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="알림마당"/>
            <View style={styles.announceContent}>
                <View style={styles.announceImgBackground}>
                    <Image source={require('../assets/announce-back.png')}
                        style={styles.announceImg} resizeMode={'contain'}/>
                    <View style={styles.announceBtnView}>
                        <LinearGradient colors={['#fbfbfba3', '#fbfbfbd4', '#ffffff']}
                            style={styles.announceBtnLinear}>
                            <Pressable style={styles.announceBtn}>
                                <Text style={styles.announceBtnText}>기부소식</Text>
                            </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#fbfbfba3', '#fbfbfbd4', '#ffffff']}
                            style={styles.announceBtnLinear}>
                            <Pressable onPress={()=>navigation.navigate('Announce2')}
                                style={styles.announceBtn}>
                                <Text style={styles.announceBtnText}>공지사항</Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </View>
                
                <View style={styles.contentListWrap}>
                    <View style={styles.refresh}>
                        <Text>전체글</Text>
                    </View>

                    <View style={styles.contentList}>
                        <View style={styles.listBoxImg}>
                            <View style={styles.contentListText}>
                                <Text style={styles.h3}>대표자</Text>
                                <Text style={styles.span1}>대표자, 과자 외 물품이 아동센터에 전달</Text>
                                <Text style={styles.span2}>날짜</Text>
                            </View>
                            <View style={styles.contentListImg}>
                                <Image source={require('../assets/ask.png')}
                                    style={styles.img} resizeMode={'contain'}/>
                            </View>
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
    announceContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
    },
    announceImgBackground: {
        position: 'relative',
        width: '100%',
        height: '22%',
        display: 'flex',
        alignItems: 'flex-end',
    },
    announceImg: {
        width: 460,
        height: 185,
    },
    announceBtnView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: '5%',
    },
    announceBtnLinear: {
        display: 'flex',
        borderRadius: 10,
        borderWidth: 0,
        width: '30%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '4%',
        marginBottom: '7%',
    },
    announceBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    announceBtnText: {
        fontWeight: 700,
        fontSize: 13,
        color: '#383838',
        lineHeight: 16,
    },
    contentListWrap: {
        position: 'relative',
        width: '100%',
        height: 'auto',
    },
    refresh: {
        display: 'flex',
        padding: '4%',
        boxSizing: 'border-box',
        height: '20%',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#d2d2d2',
    },
    contentList: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        borderBottomWidth: 1,
        borderBottomColor: '#d2d2d2',
    },
    listBoxImg: {
        width: '100%',
        height: 124,
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8',
        display: 'flex',
        flexDirection: 'row',
        wordBreak: 'break-all',
    },
    contentListText: {
        width: '61%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        paddingLeft: '6%',
    },
    h3: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: '3%',
    },
    span1: {
        fontSize: 16,
        marginBottom: '4%',
        lineHeight: 22,
        letterSpacing: 0.5,
    },
    span2: {
        fontSize: 15,
        color: '#bababa',
    },
    contentListImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '37%',
    },
    img: {
        width: '80%',
        height: '68%',
        borderRadius: 10,
    },
});