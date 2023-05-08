import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Variables } from '../components/Variables';
import { LinearGradient } from 'expo-linear-gradient';

export default function Static({navigation}){
    const [modalVisible, setModalVisible] = useState(false);
    const [money, setMoney] = useState(null);
    const [count, setCount] = useState(null);
    const [area, setArea] = useState('제주');

    const areas = ['제주', '부산', '울산', '대구', '인천',
         '대전', '광주', '서울', '부산', '울산',
         '제주', '부산', '울산', '대구', '인천',
         '제주', '부산', '울산', '대구', '인천'
    ];

    const openSelectModal = () => {
        setModalVisible(true);
    };

    const onPressArea = (area) => {
        setArea(area);
        setModalVisible(false);
    };

    const chunk = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
          arr.slice(i * size, i * size + size)
        );
    };

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="기부현황"/>
            <View style={styles.joinContent}>
                <View style={styles.countBoxView}>
                    <LinearGradient colors={['#fbfbfb57', '#fbfbfba1', '#ffffff']}
                        style={styles.countBox}>
                        <View>
                            <Text>푸드뱅크 기부금 현재</Text>
                            <Text>{money}원</Text>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#fbfbfb57', '#fbfbfba1', '#ffffff']}
                        style={styles.countBox}>
                        <View>
                            <Text>{count}명이 푸드뱅크</Text>
                            <Text>기부에 참여하고 있어요</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.staticBoxView}>
                    <View style={styles.staticBox}>
                        <Text>제공 현황</Text>
                    </View>
                </View>
                
                <View style={styles.areaBoxView}>
                    <Pressable onPress={openSelectModal}
                        style={styles.areaName}>
                        <Text>{area}</Text>
                    </Pressable>
                    <View style={styles.areaBox}>
                        <Text>지역별 선호물품</Text>
                        <Text>지역별 기부금액 통계</Text>
                    </View>
                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>지역의 선호 물품을 확인해보세요</Text>
                            <View style={styles.modalBtnView}>
                            {chunk(areas, 4).map((chunk, index) => (
                                <View key={index}>
                                {chunk.map((area, index) => (
                                    <View key={index}>
                                        <Pressable onPress={()=>onPressArea(area)}
                                            style={styles.modalBtn}>
                                            <Text>{area}</Text>
                                        </Pressable>
                                    </View>
                                ))}
                                </View>
                            ))}
                            </View>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                style={styles.button}
                            >
                                <Text style={styles.textStyle}>닫기</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

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
        display: 'flex',
        flexDirection: 'column',
        top: '14%',
    },
    countBoxView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    countBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 103,
        width: '45%',
        marginBottom: '2%',
        borderRadius: 8,
    },
    staticBoxView: {
        alignItems: 'center',
        height: '25%',
        marginBottom: '2%',
    },
    staticBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: '99%',
        width: '95%',
        marginBottom: '2%',
        borderRadius: 8,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.11,
        shadowRadius: 4,
        borderRadius: 10,
    },
    areaBoxView: {
        alignItems: 'flex-start',
        marginLeft: '2%',
    },
    areaName: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '8%',
        width: '25%',
        marginBottom: '2%',
        borderRadius: 8,

        borderWidth: 1,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'rgba(133, 133, 133, 0.09)',
        boxShadow: '2px 2px 1px rgba(116, 116, 116, 0.03)',
        borderRadius: 10,
    },
    areaBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: '55%',
        width: '98%',
        marginBottom: '2%',
        borderRadius: 8,

        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.11,
        shadowRadius: 4,
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        padding: '3%',
        backgroundColor: "white",
        borderRadius: 20,
        width: '90%',
        height: '50%',
        justifyContent: 'space-around',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: '3%',
        width: '20%',
        elevation: 2,
        backgroundColor: Variables.btnColor,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalBtnView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: '50%',
    },
    modalBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 50,
        height: 40,
        marginBottom: '30%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#B5B5B5',
        borderRadius: 5,
    },
});