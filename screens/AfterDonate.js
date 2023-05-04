import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Variables } from '../components/Variables';

export default function AfterDonate({navigation}){
    return(
        <View style={styles.joinBody}>
            <ScreenHeader/>
            <View style={styles.aiContent}>
                <Image source={require("../assets/donate-done.gif")}
                    style={styles.doneImg} resizeMode={'contain'} />
                    
                <Text style={styles.doneTitle}>따뜻한 마음 전달 감사합니다!</Text>
                <Text>접수가 정상적으로 처리되었습니다.</Text>
                <Text>검수 후 알림 드리겠습니다.</Text>
                <Pressable style={styles.submitBtn}
                    onPress={()=>navigation.navigate('MainScreen')}>
                    <Text style={styles.submitBtnText}>홈으로 돌아가기</Text>
                </Pressable>
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
        backgroundColor: Variables.mainColor,
    },
    aiContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '16%',
        display: 'flex',
        alignItems: 'center',
    },
    doneImg: {
        position: 'relative',
        width: '57%',
        height: '25%',
        backgroundColor: 'transparent',
    },
    doneTitle: {
        fontWeight: 700,
        fontSize: 22,
        color: Variables.btnColor,
    },
    submitBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '6%',
        backgroundColor: Variables.btnColor,
        borderRadius: 5,
    },
    submitBtnText:{
        color: '#fff',
        fontWeight: 700,
        fontSize: 19,
    },
});