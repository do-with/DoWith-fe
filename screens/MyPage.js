import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Alert } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { Variables } from '../components/Variables';
import { AuthContext } from '../contexts/AuthContext';

export default function MyPage({navigation}){
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    useEffect(() => {
        console.log(isAuthenticated);
    }, [isAuthenticated]);

    const onClickLogoutBtn = () => {
        Alert.alert(
          "로그아웃",
          "정말로 로그아웃하시겠습니까?",
          [
            {
              text: "취소",
              style: "cancel",
            },
            {
              text: "확인",
              onPress: () => {
                logout();
              },
            },
          ],
          { cancelable: false }
        );
    };

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="마이페이지"/>
            <View style={styles.joinContent}>
                {!isAuthenticated ? (
                    <Pressable onPress={()=>navigation.navigate('LoginScreen')}>
                        <View style={styles.myProfile}> 
                            <Text style={styles.profileText}>로그인이 필요합니다.</Text>
                        </View>
                    </Pressable>
                ) : (
                    <View>
                        <View style={styles.myProfile}>
                            <Text style={styles.profileText}>프로필</Text>
                            {user && (
                                <Text style={styles.profileText}>{user.name}</Text>
                            )}
                        </View>
                        <View style={styles.myInfoBoardView}>
                            <Pressable style={styles.myInfoBoard}
                                onPress={()=>navigation.navigate('CheckToken')}>
                                <Text style={styles.boardText}>토큰</Text>
                                <Image source={require('../assets/token.png')}
                                    resizeMode={'contain'}
                                    style={styles.img}
                                />
                                <Text style={styles.text}>5000</Text>
                            </Pressable>
                            <Pressable style={styles.myInfoBoard}
                                onPress={()=>navigation.navigate('CheckDonation')}>
                                <Text style={styles.boardText}>기부 횟수</Text>
                                <Image source={require('../assets/pride.png')}
                                    resizeMode={'contain'}
                                    style={styles.img}
                                />
                                <Text style={styles.text}>5회</Text>
                            </Pressable>
                        </View>
                        <View style={styles.myPageBtnView}>
                            <LinearGradient colors={['#d7eeff','#ffffff']}
                                style={styles.myPageBtn}>
                                <Pressable onPress={()=>navigation.navigate('SupportMoney')}>
                                    <Text style={styles.myPageText}>토큰 발행하기</Text>
                                </Pressable>
                            </LinearGradient>
                        </View>
                        <View style={styles.myListView}>
                            <Pressable style={styles.myList}>
                                <Text style={styles.text}>나의 물품 내역</Text>
                            </Pressable>
                            <Pressable style={styles.myList}>
                                <Text style={styles.text}>알림 목록 조회</Text>
                            </Pressable>
                            <Pressable style={styles.myList}>
                                <Text style={styles.text}>나의 문의 내역</Text>
                            </Pressable>
                        </View>
                        <Pressable onPress={()=>onClickLogoutBtn()}>
                            <View style={styles.myProfile}>
                                <Text style={styles.profileText}>로그아웃</Text>
                            </View>
                        </Pressable>
                    </View>
                )}
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
        alignItems: 'center',
        backgroundColor: Variables.mainColor,
    },
    joinContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
    },
    myProfile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 60,
        marginTop: '2%',
        marginBottom: '2%',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    profileText: {
        fontWeight: 500,
        fontSize: 18,
        marginLeft: '10%',
        marginRight: '10%',
    },
    myInfoBoardView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    myInfoBoard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        height: 103,
        marginBottom: '2%',
        backgroundColor: '#fff',
    },
    boardText: {
        fontWeight: 400,
        fontSize: 16,
    },
    img: {
        width: 35,
        height: 35,
    },
    myPageBtnView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myPageBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '95%',
        height: 70,
        marginBottom: '2%',
        borderRadius: 8,
    },
    myPageText: {
        fontWeight: 500,
        fontSize: 19,
        lineHeight: 28,
        letterSpacing: 0.055,
        color: '#050505',
    },
    myListView: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-around',
        width: '100%',
        height: '48%',
        backgroundColor: '#fff',
    },
    myList: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'center',
        height: '16%',
    },
    text: {
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 25,
        marginLeft: '5%',
        letterSpacing: 0.15,
        // color: '#414141',
    },
});