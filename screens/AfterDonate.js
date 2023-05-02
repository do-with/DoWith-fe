import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';

export default function AfterDonate({navigation}){
    return(
        <View style={styles.joinBody}>
            <ScreenHeader/>
            <View style={styles.joinContent}>
                <Image source={require("../assets/donator.png")}
                    style={styles.img} resizeMode={'contain'} />
                <Text>기부가 완료되었습니다.</Text>
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
        // top: '14%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 50,
        height: 50,
    },
});