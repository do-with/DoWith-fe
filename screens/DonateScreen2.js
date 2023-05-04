import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { LinearGradient } from "expo-linear-gradient";

export default function DonateScreen2({ navigation }) {
    const [category, setCategory] = useState('');

    return (
    <View style={styles.registerBody}>
        <ScreenHeader headerTitle="기부하기" />
        <View style={styles.registerContent}>
            <Text style={styles.personalizeText}>지영 님 마음 전달 중 ... ♡</Text>
            <View style={styles.registerBox}>
                {/* 카카오 주소 api 사용 */}
                <View style={styles.registerDonate1}>
                    <View style={styles.registerAddress}>
                        <View style={styles.findAddress}>
                            <TextInput
                                value={category}
                                onChangeText={setCategory}
                                placeholder="우편번호"
                            />
                        </View>
                        <TextInput
                            value={category}
                            onChangeText={setCategory}
                            placeholder="주소"
                        />
                        <TextInput
                            value={category}
                            onChangeText={setCategory}
                            placeholder="상세주소"
                        />
                        <TextInput
                            value={category}
                            onChangeText={setCategory}
                            placeholder="참고항목"
                        />
                    </View>
                </View>

                <View style={[styles.registerDonate1, styles.registerDonate1Sm]}>
                    <Text>기부 방법을 선택해주세요 *</Text>
                    <View style={styles.howToDonateBtn}>
                        <Pressable>
                            <Text>택배</Text>
                        </Pressable>
                        <Pressable>
                            <Text>수거</Text>
                        </Pressable>
                        <Pressable>
                            <Text>방문</Text>
                        </Pressable>
                    </View>
                    <Text>지정된 매장 주소로 택배를 보내주셔야 합니다.</Text>
                </View>
                <LinearGradient colors={['#3b5998','#3b5998','#003C7C']}
                    style={styles.registerBtn}>
                    <Pressable onPress={()=>navigation.navigate('AfterDonate')}>
                        <Text style={styles.registerBtnText}>완료</Text>
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
    registerAddress: {
        display: 'flex',
        flexDirection: 'column',
        width: '85%',
        height: '95%',
        justifyContent: 'center',
    },
    findAddress: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '18%',
        marginBottom: '4%',
    },
    registerDonate1Sm : {
        height: 136,
    },
    howToDonateBtn: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '45%',
        justifyContent: 'space-evenly',
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