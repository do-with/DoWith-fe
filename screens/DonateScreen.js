import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { LinearGradient } from "expo-linear-gradient";

export default function DonateScreen({ navigation }) {
    const [category, setCategory] = useState('');
    // const [category, setCategory] = useState('');
    // const [category, setCategory] = useState('');
    // const [category, setCategory] = useState('');

    return (
    <View style={styles.registerBody}>
        <ScreenHeader headerTitle="기부하기" />
        <View style={styles.registerContent}>
            <Text style={styles.personalizeText}>지영 님 마음 전달 중 ... ♡</Text>
            <View style={styles.registerBox}>
                <View style={styles.registerDonate1}>
                    <Text>대분류 선택 *</Text>
                    <TextInput
                        value={category}
                        onChangeText={setCategory}
                        placeholder="눌러주세요"       
                        style={styles.inputText} 
                    />
                    <View style={styles.donateItemPic}>
                        <Text>유통기한이 있다면 보이게 찍어주세요.</Text>
                        <Pressable>
                            <Text>기부 물품 찍기</Text>
                        </Pressable>
                        <Text>여러 개인 경우 전체적인 모습을 찍어주세요.</Text>
                    </View>
                </View>

                <View style={styles.registerDonate1}>
                    <Text>대표 물품명 *</Text>
                    <TextInput
                        value={category}
                        onChangeText={setCategory}
                        placeholder="대표 물품을 입력해주세요"       
                        style={styles.inputText} 
                    />
                    <Text>수량 *</Text>
                    <TextInput
                        value={category}
                        onChangeText={setCategory}
                        placeholder="총 수량을 입력해주세요"       
                        style={styles.inputText} 
                    />
                    <Text>기부자명 *</Text>
                    <TextInput
                        value={category}
                        onChangeText={setCategory}
                        placeholder="기부자 닉네임을 적어주세요"       
                        style={styles.inputText} 
                    />
                </View>
                <LinearGradient colors={['#3b5998','#3b5998','#003C7C']}
                    style={styles.registerBtn}>
                    <Pressable onPress={()=>navigation.navigate('DonateScreen2')}>
                        <Text style={styles.registerBtnText}>다음</Text>
                    </Pressable>
                </LinearGradient>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    registerBody: {
        width: '100%',
        height: '100%',
        backgroundColor: Variables.mainColor,
        flexWrap: 'wrap',
    },
    registerContent: {
        width: '100%',
        height: '75%',
        position: 'relative',
        top: '15%',
    },
    personalizeText: {
        letterSpacing: 1,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 23,
        color: '#2D4C89',
        marginLeft: '8%',
    },
    registerBox: {
        width: '100%',
        height: '91%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2%',
    },
    registerDonate1: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        shadowColor: '#8B8B8B',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.16,
        borderRadius: 8,
        width: '91%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginTop: '3%',
        alignItems: 'center',
        boxSizing: 'border-box',
        paddingTop: '6%',
    },
    inputText: {
        width: '100%',
        height: '12%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    donateItemPic: {
        display: 'flex',
        flexDirection: 'column',
        width: '87%',
        height: 88,
        marginTop: '2%',
    },
    registerBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundBlendMode: 'soft-light, normal',
        shadowColor: 'rgba(166, 171, 189, 0.8)',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        borderRadius: 10,
        color: 'white',
        width: '36%',
        height: '10%',
        margin: 16,
    },
    registerBtnText: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#fff',
    },
});