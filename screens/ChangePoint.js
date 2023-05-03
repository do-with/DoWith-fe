import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from '../components/Variables';

export default function ChangePoint({ navigation }) {
    const [point, setPoint] = useState('');
    const onSubmit = () => {
        // if (money) {
        //     const data = {
        //         point: point
        //     };
        //     axios.post(`http://${ipAddress}:8080/`, data, 
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         })
        //         .then(() => {
        //             navigation.navigate('MainScreen');
        //         })
        //         .catch(error => console.log(error));
        // } 
    };
    return (
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="변환하기" />
            <View style={styles.joinContent}>
                <Text>포인트로 변환할 금액 *</Text>
                <TextInput
                    value={point}
                    onChangeText={setPoint}
                    placeholder="충전할 금액에서 기부할 금액을 입력해주세요"       
                    style={styles.input}    
                />
                <Pressable style={styles.submitBtn}
                    onPress={onSubmit}>
                    <Text style={styles.submitBtnText}>변환하기</Text>
                </Pressable>
                <View style={styles.changePointSpan}>
                    <Text style={styles.red}>포인트로 전환한 이후에는 돈으로 바꿀 수 없습니다.</Text>
                    <Text style={styles.red}>신중하게 기부 할 금액을 입력해주세요.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    joinBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    joinContent: {
        width: '100%',
        height: '84%',
        position: 'absolute',
        top: '16%',
    },
    input: {
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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
    changePointSpan: {
        width: '92%',
        height: '5%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        paddingLeft: '4%',
    },
    red: {
        color: '#CA0000',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.06,
    },
});