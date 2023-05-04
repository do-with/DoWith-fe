import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from '../components/Variables';

export default function ChargeMoney({ navigation }) {
    const [money, setMoney] = useState('');
    const onSubmit = () => {
        // if (money) {
        //     const data = {
        //         money: money
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
            <ScreenHeader headerTitle="충전하기" />
            <View style={styles.joinContent}>
                <Text>충전 금액 *</Text>
                <TextInput
                    value={money}
                    onChangeText={setMoney}
                    placeholder="충전 금액을 입력하세요"       
                    style={styles.input}    
                />
                <Pressable style={styles.submitBtn}
                    onPress={onSubmit}>
                    <Text style={styles.submitBtnText}>충전하기</Text>
                </Pressable>
                <View style={styles.chargeSpan}>
                    <Text>충전하시는 금액은 포인트로 전환이 가능합니다.</Text>
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
    chargeSpan: {
        width: '100%',
        height: '2%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        paddingLeft: '8%',
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
});