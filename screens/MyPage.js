import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';

export default function MyPage({navigation}){
    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="마이페이지"/>
            <View style={styles.joinContent}>
                <Pressable>
                    <Text>마이페이지</Text>
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
    joinContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
    },
});