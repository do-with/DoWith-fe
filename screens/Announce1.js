import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';

export default function Announce1({navigation}){
    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="알림마당"/>
            <View style={styles.announceContent}>
                <Pressable>
                    <Text>기부소식</Text>
                </Pressable>
                <Pressable>
                    <Text>공지사항</Text>
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
    }
});