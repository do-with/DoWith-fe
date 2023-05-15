import React, { useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { Variables } from '../components/Variables';
import { AuthContext } from '../contexts/AuthContext';

export default function MyPage({navigation}){
    const { user, isAuthenticated } = useContext(AuthContext);
    
    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="마이페이지"/>
            <View style={styles.joinContent}>
                <View>
                {isAuthenticated ? (
                    <View style={styles.myProfile}>
                        <Text style={styles.profileText}>프로필</Text>
                        <Text style={styles.profileText}>{user.name}</Text>
                    </View>
                ) : (
                    <Pressable onPress={()=>navigation.navigate('LoginScreen')}>
                        <View style={styles.myProfile}> 
                            <Text style={styles.profileText}>로그인이 필요합니다.</Text>
                        </View>
                    </Pressable>
                )}
                </View>
                <View style={styles.myInfoBoardView}>
                    <View style={styles.myInfoBoard}>
                        <Text style={styles.boardText}>포인트</Text>
                    </View>
                    <View style={styles.myInfoBoard}>
                        <Text style={styles.boardText}>충전 금액</Text>
                    </View>
                    <View style={styles.myInfoBoard}>
                        <Text style={styles.boardText}>기부 횟수</Text>
                    </View>
                </View>
                <View style={styles.myPageBtnView}>
                    <LinearGradient colors={['#d7eeff','#ffffff']}
                         style={styles.myPageBtn}>
                        <Pressable onPress={()=>navigation.navigate('ChargeMoney')}>
                            <Text style={styles.text}>금액 충전하기</Text>
                        </Pressable>
                    </LinearGradient>
                    <LinearGradient colors={['#d7eeff','#ffffff']}
                        style={styles.myPageBtn}>
                        <Pressable onPress={()=>navigation.navigate('ChangePoint')}>
                            <Text style={styles.text}>포인트로 바꾸기</Text>
                        </Pressable>
                    </LinearGradient>
                </View>
                <View style={styles.myListView}>
                    <Pressable style={styles.myList}
                        onPress={()=>navigation.navigate('DonationList')}>
                        <Text style={styles.text}>나의 기부금 목록</Text>
                    </Pressable>
                    <Pressable style={styles.myList}>
                        <Text style={styles.text}>알림 목록 조회</Text>
                    </Pressable>
                    <Pressable style={styles.myList}
                        onPress={()=>navigation.navigate('MyCsList')}>
                        <Text style={styles.text}>나의 문의 내역</Text>
                    </Pressable>
                </View>
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
    },
    joinContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
        backgroundColor: Variables.mainColor,
    },
    myProfile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    },
    myInfoBoardView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    myInfoBoard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '32%',
        height: 103,
        marginBottom: '2%',
        backgroundColor: '#fff',
    },
    boardText: {
        fontWeight: 400,
        fontSize: 16,
    },
    myPageBtnView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    myPageBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '45%',
        height: 70,
        marginBottom: '2%',
        borderRadius: 8,
    },
    myListView: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-around',
        width: '100%',
        height: '55%',
        backgroundColor: '#fff',
    },
    myList: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'center',
        height: '15%',
    },
    text: {
        fontWeight: 500,
        fontSize: 17,
        marginLeft: '5%',
    },
});