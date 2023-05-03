import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { InputImgBtn } from '../components/InputImgBtn';

export default function AboutScreen({navigation}){
    return(
        <View style={styles.aboutBody}>
            <ScreenHeader headerTitle="이용방법"/>
            <View style={styles.aboutContent}>
                <Text>홈페이지 이용방법</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        wordBreak: 'break-all',
    },
    aboutContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});