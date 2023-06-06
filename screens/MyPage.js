import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Alert } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { Variables } from '../components/Variables';
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { ipAddress } from "../ipAddress";

export default function MyPage({ navigation }) {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [count, setCount] = useState(0);

  const user_id = user?.id;

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/item/passed-item-count/${user_id}`)
      .then((response) => setCount(response.data))
      .catch((error) => console.log(error));
  }, []);
  
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
                {!isAuthenticated || !user || !user.id ? (
                    <Pressable onPress={()=>navigation.navigate('LoginScreen')}>
                        <View style={styles.myProfile}> 
                            <Text style={styles.profileText}>로그인이 필요합니다.</Text>
                        </View>
                    </Pressable>
                ) : (
                    <View style={{alignItems: 'center'}}>
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
                                <Text style={styles.text}>
                                  {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}회
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.myPageBtnView}>
                            <LinearGradient colors={['#d7eeff','#ffffff8a']}
                                style={styles.myPageBtn}>
                                <Pressable onPress={()=>navigation.navigate('SupportMoney')}>
                                    <Text style={styles.myPageText}>토큰 발행하기</Text>
                                </Pressable>
                            </LinearGradient>
                        </View>
                        <View style={styles.myListView}>
                            <Pressable style={styles.myList}
                                onPress={()=>navigation.navigate('MyLocalTradeList')}>
                                <Text style={styles.listText}>지역거래 물품 내역</Text>
                            </Pressable>
                            <Pressable style={styles.myList}
                                onPress={()=>navigation.navigate('MyCsList')}>
                                <Text style={styles.listText}>나의 문의 내역</Text>
                            </Pressable>
                        </View>

                        <Pressable onPress={()=>onClickLogoutBtn()}
                            style={styles.logout}>
                                <Ionicons name="log-out-outline" size={20} color="#808080" />
                                <Text style={styles.logoutText}>로그아웃</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>

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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '48%',
        height: 115,
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
        height: '49%',
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
        letterSpacing: 0.15,
        // color: '#414141',
    },
    listText: {
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 25,
        letterSpacing: 0.15,
        marginLeft: '5%',
    },
    logout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
        height: '7%',
    },
    logoutText: {
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 28,
        letterSpacing: 0.055,
        marginLeft: 5,
        color: '#808080',
    },
});