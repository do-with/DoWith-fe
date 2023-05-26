import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { LinearGradient } from 'expo-linear-gradient';
import { Variables } from "../components/Variables";
import { ipAddress } from "../ipAddress";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

function MainScreen({ navigation}) {
    const { isAuthenticated } = useContext(AuthContext);
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/user/count`)
            .then(response => setCount(response.data))
            .catch(error => console.log(error))
    }, []);

    const onChargeBtnClick = () => {
        if (isAuthenticated) {
            navigation.navigate('');
        }
        else {
            navigation.navigate('LoginScreen');
        }
    };
    
    return (
        <View style={styles.mainBody}>
            <ScreenHeader headerTitle="DoWith"/>
            <View style={styles.mainContent}>
                <View style={styles.mainContentTotalDonor}>
                    <View style={styles.highlightSentence}>
                        <View style={styles.hightBlock}>
                            <Text style={{fontSize: 15, fontWeight: 600}}>" 많은 사람들이 푸드뱅크 기부에 참여하고 있어요 "</Text>
                        </View>
                        <Text style={styles.totalDonorCount}>{count}명</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.contentCategory}>
                        <TouchableOpacity style={styles.transImgBtn}
                            onPress={() => navigation.navigate("NearByStore")}>
                            <Image source={require("../assets/store.png")}
                                style={styles.img} resizeMode={"contain"}/>
                            <Text>가까운 매장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transImgBtn}
                            onPress={() => navigation.navigate("Announce1")}>
                            <Image source={require("../assets/notice.png")}
                                style={styles.img} resizeMode={"contain"}/>
                            <Text>알림 마당</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transImgBtn}
                            onPress={() => navigation.navigate("Static")}>
                            <Image source={require("../assets/donateSitu.png")}
                                style={styles.img} resizeMode={"contain"}/>
                            <Text>기부 현황</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentCategory}>
                        <TouchableOpacity style={styles.transImgBtn}
                            onPress={() => navigation.navigate("AboutScreen")}>
                            <Image source={require("../assets/menual.png")}
                                style={styles.img} resizeMode={"contain"}/>
                            <Text>이용 방법</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transImgBtn}
                            onPress={() => navigation.navigate("FirstCsPage")}>
                            <Image source={require("../assets/ask.png")}
                                    style={styles.img} resizeMode={"contain"}/>
                            <Text>문의하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transImgBtn}
                            onPress={onChargeBtnClick}>
                            <Image source={require("../assets/burger.png")}
                                    style={styles.img} resizeMode={"contain"}/>
                            <Text>충전하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.contentMine}>
                    <LinearGradient colors={['#2992be','#2A93BF', '#3b5998']}
                            style={styles.localTradeBtn}>
                        <Pressable onPress={() => navigation.navigate('LocalTrade')}>
                            <Text style={styles.localTradeBtnText}>우리 동네</Text>
                            <Text style={styles.localTradeBtnText}>기부 거래</Text>
                            <Image source={require('../assets/local-trade1.png')} resizeMode='contain' />
                        </Pressable>
                    </LinearGradient>

                    <Pressable style={styles.donationBtn}
                        onPress={() => navigation.navigate('DonateScreen')}>
                        <Text style={styles.donationBtnText}>5분 만에</Text>
                        <Text style={styles.donationBtnText}>기부 접수</Text>
                        <Image source={require('../assets/image18.png')} resizeMode='contain' />
                    </Pressable>
                </View>

                <View style={styles.tokenDonateView}>
                    <LinearGradient colors={['#b2d5ffd4', '#D7EEFF']}
                        style={styles.tokenDonate}>
                        <Pressable onPress={()=>navigation.navigate('SupportMoney')}>
                            <Text style={styles.supportMoneyBtn}>포인트 기부하기</Text>
                        </Pressable>
                    </LinearGradient> 
                </View>
            </View>
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    mainBody: {
        color: 'transparent',
    },
    transImgBtn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        height: '35%',
    },
    img: {
        width: 55,
        height: 55,
    },
    mainContent: {
        height: '95%',
        width: '100%',
        top: '14%',
        position: 'relative',
        backgroundColor: Variables.mainColor,
    },
    mainContentTotalDonor: {
        width: '100%',
        height: '17%',
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
    totalDonorCount: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 9,
        fontSize: 23,
        color: 'black',
        fontWeight: 600,
        lineHeight: 33,
    },
    hightBlock: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '86%',
        height: 18,
        display: 'flex',
        backgroundColor: 'rgba(178, 213, 255, 0.83)',
        zIndex: 0,
        marginTop: 14,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems:'center',
        height: '33%',
        position: 'relative',
        backgroundColor: 'white',
    },
    contentCategory: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        alignItems:'center',
        height: '32%',
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        boxShadow: '1px 2px 4px rgba(70, 70, 70, 0.2)',
    },
    contentMine: {
        position: 'relative',
        width: '100%',
        height: '29%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    
    },
    donationBtn: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        height: '65%',
        boxSizing: 'border-box',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#B6B6B6',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        backgroundColor: '#fff',
        shadowOpacity: 0.33,
        shadowRadius: 3,
        elevation: 3,
    },
    localTradeBtn: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.63)',
        border: 'none',
        boxShadow: '1px 2px 2px 1px rgba(182, 182, 182, 0.179)',
        borderRadius: '8px',
        backgroundColor: 'white',
        fontSize: '16px',
        fontWeight: 700,
        // letterSpacing: '2px',
    },
    localTradeBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    donationBtnText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    contentBtn: {
        width: '40%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    tokenDonateView: {
        display: 'flex',
        alignItems: 'center',
    },
    tokenDonate: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '30%',
        borderRadius: 5,
    },
    supportMoneyBtn: {
        fontWeight: 500,
        fontSize: 18,
    },
});