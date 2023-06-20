import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Variables } from '../components/Variables';
import { LinearGradient } from 'expo-linear-gradient';
import BarGraph from '../components/BarGraph';
import RingGraph from '../components/RingGraph';
import { ipAddress } from '../ipAddress';
import axios from 'axios';

export default function Static({navigation}){
    const [modalVisible, setModalVisible] = useState(false);
    const [money, setMoney] = useState(null); // 후원금액 get
    const [count, setCount] = useState(null); // 기부 참여자 수 get
    const [area, setArea] = useState('제주'); // 지역 이름
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null); // 선택된 버튼의 인덱스 저장
    const [areaNum, setAreaNum] = useState(0); // 지역 번호
    
    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/user/count`)
            .then(response => setCount(response.data))
            .catch(error => console.log(error))
    }, []);

    const [preferTitle, setPreferTitle] = useState([]); // 차트 데이터
    const [preferValue, setPreferValue] = useState([]); 
    useEffect(() => {
        axios.get(`http://${ipAddress}:8888/preferItem/${areaNum}`)
            .then(response => {
                setPreferTitle(response.data.prefer_title);
                setPreferValue(response.data.prefer_value)
                console.log(response.data.prefer_title);
            })
            .catch(error => {
                console.log(error);
            });
    }, [areaNum]);

    const barGraphData = {
        labels: preferTitle,
        datasets: [
            {
                data: preferValue,
            },
        ],
    };

    const [preferData, setPreferData] = useState([]); // 부족 물품 데이터
    useEffect(() => {
        axios.get(`http://${ipAddress}:8888/preferItem/top3/${areaNum}`)
            .then(response => {
                setPreferData(response.data.top_three);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [areaNum]);

    const ringGraphData = [0.4];

    // const barGraphData = {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    //     datasets: [
    //       {
    //         data: [20, 45, 28, 80, 99, 43],
    //       },
    //     ],
    // };

    const areaMappings = {
        서울: 1,
        부산: 2,
        대구: 3,
        인천: 4,
        광주: 5,
        대전: 6,
        울산: 7,
        경기: 8,
        강원: 9,
        충북: 10,
        충남: 11,
        전북: 12,
        전남: 13,
        경북: 14,
        경남: 15,
        제주: 16,
        세종: 17,
    };
    
    const areas = [
        "서울",
        "부산",
        "대구",
        "인천",
        "광주",
        "대전",
        "울산",
        "경기",
        "강원",
        "충북",
        "충남",
        "전북",
        "전남",
        "경북",
        "경남",
        "제주",
        "세종",
    ];

    const openSelectModal = () => {
        setModalVisible(true);
    };

    const onPressArea = (area) => {
        setArea(area);
        setAreaNum(areaMappings[area]);
        setModalVisible(false);
        setSelectedButtonIndex(area);
    };

    const chunk = (arr, size) => {
        const chunks = [];
        const numChunks = Math.ceil(arr.length / size);
    
        for (let i = 0; i < size; i++) {
          const chunk = [];
          for (let j = 0; j < numChunks; j++) {
            const element = arr[j * size + i];
            if (element !== undefined) {
              chunk.push(element);
            }
          }
          chunks.push(chunk);
        }
    
        return chunks;
    };

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="기부현황"/>
            <View style={styles.joinContent}>
                <View style={styles.graphBoxContainer}>
                    <Text style={[styles.basicText, 
                        {
                            fontSize: 17,
                            marginVertical: '2%',
                        }]}
                    >
                        전체 모금 현황
                    </Text>
                    <View style={styles.graphBox}>
                        <RingGraph data={ringGraphData} />
                        <View style={styles.textView}>
                            <View>
                                <Text style={styles.basicText}>현재 모금액</Text>
                                <Text style={styles.basicText}>512,000원</Text>
                            </View>
                            <View>
                                <Text style={styles.basicText}>기부 참여자</Text>
                                <Text style={styles.basicText}>{count}명</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.titleView}>
                        <Text style={[styles.basicText, {fontSize: 17}]}>
                            푸드뱅크 지역별 상세 기부 현황
                        </Text>
                        <Pressable onPress={openSelectModal}
                            style={styles.areaName}>
                            <Text style={{fontWeight: 700, fontSize: 15, color: '#3a3a3a'}}>
                                {area}
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.summaryBoxView}>
                        <LinearGradient colors={['#d7eeff61', '#d7eeff']}
                            style={styles.summaryBox}>
                            <View>
                                <Text style={{fontWeight: 500, fontSize: 15, color: 'rgba(5,5,5,0.61)'}}>
                                    {area} 부족 물품은
                                </Text>
                                <Text style={{fontWeight: 500, fontSize: 17}}>
                                    1위 {preferData[0]}, 2위 {preferData[1]}, 3위 {preferData[2]}입니다!
                                </Text>
                            </View>
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={styles.lineText}>기부 물품 현황</Text>
                            {preferTitle.length > 0 && (
                                    <BarGraph data={barGraphData} />
                            )}
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
                                            style={[
                                                styles.modalBtn,
                                                selectedButtonIndex === area && styles.selectedModalBtn,
                                            ]}>
                                            <Text style={selectedButtonIndex === area && styles.selectedModalBtnText}>
                                                {area}
                                            </Text>
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
        alignItems: 'center',
    },
    joinContent: {
        width: '90%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        top: '14%',
    },
    basicText: {
        fontWeight: 700,
        color: '#3a3a3a',
        lineHeight: 25,
    },
    graphBoxContainer: {
        height: '28%',
        marginBottom: '1%',
    },
    graphBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '75%',
        marginBottom: '2%',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.11,
        shadowRadius: 4,
    },
    textView:{
        width: '40%',
        height: '55%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomContainer: {
        height: '65%',
        justifyContent: 'space-around',
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '7%',
        marginBottom: '2%',
    },
    areaName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '95%',
        width: '20%',
        borderRadius: 8,
    },
    summaryBoxView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    summaryBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 103,
        width: '100%',
        marginBottom: '5%',
        borderRadius: 8,
    },
    lineText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#3A3A3A',
        marginBottom: '2%',
    },
    // modal style
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
        height: '55%',
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
        marginTop: '5%',
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
        borderRadius: 4,
    },
    selectedModalBtn: {
        backgroundColor: Variables.btnColor, // 선택된 버튼의 색상
        borderWidth: 0,
    },
    selectedModalBtnText: {
        color: 'white', // 선택된 버튼의 글자색
    },
});