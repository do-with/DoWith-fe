import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { Variables } from '../components/Variables';
import { ipAddress } from '../ipAddress';
import axios from 'axios';

export default function LocalTrade({navigation}){
    const [money, setMoney] = useState(null); // 기부금 get
    const [count, setCount] = useState(null); // 참여자 수 get
    const [localTradeList, setLocalTradeList] = useState('');

    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/local-trade`)
            .then(response => {
                setLocalTradeList(response.data);
            })
            .catch(error => console.log(error))
      }, []);

    const chunk = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
          arr.slice(i * size, i * size + size)
        );
    };

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="기부 거래"/>
            <View style={styles.joinContent}>
                <View style={styles.highlightSentenceView}>
                    <View style={styles.highlightSentence}>
                        <View style={styles.hightBlock}>
                            <Text style={{fontSize: 14, fontWeight: 600}}>" 판매 금액이 어디로 전달되는지 보러가기 "</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.countBoxView}>
                    <LinearGradient colors={['#fbfbfb57', '#fbfbfba1', '#ffffff']}
                        style={styles.countBox}>
                        <View>
                            <Text>지역 거래 기부금 현재</Text>
                            <Text>{money}원</Text>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#fbfbfb57', '#fbfbfba1', '#ffffff']}
                        style={styles.countBox}>
                        <View>
                            <Text>{count}명이</Text>
                            <Text>함께 해주셨어요</Text>
                        </View>
                    </LinearGradient>
                </View>

                {localTradeList && (
                <View style={styles.tradeBoardView}>
                    <ScrollView>
                        <View>
                        {chunk(localTradeList, 2).map((chunk, index) => (
                            <View style={styles.tradeBoardRow} key={index}>
                            {chunk.map((localTrade, index) => (
                                <View key={index}>
                                    <Pressable style={styles.tradeBoard}>
                                        <Image source={require('../assets/local-trade1.png')}
                                            resizeMode={'contain'} />
                                        <View>
                                            <Text>{localTrade.name}</Text>
                                            <Text>{localTrade.create_at}</Text>
                                            <Text>{localTrade.price}</Text>

                                        </View>
                                    </Pressable>
                                </View>
                            ))}
                            </View>
                        ))}
                        </View>
                    </ScrollView>
                </View>
                )}
                
                <View style={styles.submitBtnView}>
                    <LinearGradient colors={['#003c7cf0', '#003c7cd1', '#003c7cc2']}
                        style={styles.submitBtn}>
                        <Pressable onPress={()=>navigation.navigate('RegisterLocalTrade')}>
                            <Text style={styles.submitBtnText}>올리기</Text>
                        </Pressable>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    joinBody: {
        width: '100%',
        height: '100%',
        backgroundColor: Variables.mainColor,
        wordBreak: 'break-all',
    },
    joinContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
    },
    highlightSentenceView: {
        width: '100%',
        height: '8%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    highlightSentence: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
        height: '30%',
        boxSizing: 'border-box',
    },
    hightBlock: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '75%',
        height: 18,
        display: 'flex',
        backgroundColor: 'rgba(178, 213, 255, 0.83)',
        zIndex: 0,
        marginTop: 14,
    },
    countBoxView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        height: '15%',
    },
    countBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        marginBottom: '2%',
        borderRadius: 8,
    },
    submitBtnView: {
        position: 'absolute',
        width: '40%',
        height: '10%',
    },
    submitBtn: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 20,
    },
    submitBtnText: {
        fontWeight: '700',
        fontSize: 23,
        lineHeight: 28,
        letterSpacing: 0.06,
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.36)',
        textShadowOffset: {
            width: 0,
            height: 4,
        },
        textShadowRadius: 4,
    },
    tradeBoardView: {
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    tradeBoardRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: 'red',
    },
    tradeBoard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 55,
        width: '100%',
        // height: '80%',
        marginBottom: '2%',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 8,
        backgroundColor: 'rgba(251, 251, 251, 0.35)',
        shadowColor: '#c9c9c9',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.26,
        shadowRadius: 4,
        borderRadius: 10,
    },
});