import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Variables } from '../components/Variables';

export default function CheckToken({navigation}){
    const onClickTab = (tabName) => {
        if (tabName === '입금') {
            // 송금내역리스트
        }
        else if (tabName === "출금") {
            // 출금내역 리스트
        }
    };

    return(
        <View style={styles.aboutBody}>
            <ScreenHeader headerTitle="토큰"/>
            <View style={styles.aboutContent}>
                <View style={{height: '5%', justifyContent: 'center'}}>
                    <Text style={styles.titleText}>토큰 발행 내역</Text>
                </View>
                <View style={styles.myTokenView}>
                    <Text style={styles.grayText}>내 토큰</Text>
                    <Image source={require('../assets/token.png')}
                        resizeMode={'contain'}
                        style={styles.img}
                    />
                    <Text style={styles.variText}>5000</Text>
                </View>
            </View>
            <View style={styles.myListView}>
                <View style={styles.myListRow}>
                    <Pressable style={styles.myListRowBtn}
                        onPress={()=>onClickTab('입금')}>
                        <Text style={styles.myListRowBtnText}>입금</Text>
                    </Pressable>
                    <Pressable style={styles.myListRowBtn}
                        onPress={()=>onClickTab('출금')}>
                        <Text style={styles.myListRowBtnText}>출금</Text>
                    </Pressable>
                </View>
                {/* map으로 */}
                <View style={styles.myListDetail}>
                    <View>
                        <Text style={styles.blueText}>입금</Text>
                        <Text style={styles.grayText}>2023-06-05</Text>
                    </View>
                    <Text style={styles.moneyText}>-150원</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutBody: {
        width: '100%',
        height: '100%',
        backgroundColor: Variables.mainColor,
        alignItems: 'center',
    },
    aboutContent: {
        width: '90%',
        height: '100%',
        top: '14%',
        display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
    },
    titleText: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0.15,
        color: '#353535',
    },
    myTokenView: {
        width: '100%',
        height: '19%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    img: {
        width: 50,
        height: 50,
    },
    grayText: {
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 19,
        letterSpacing: 0.15,
        color: '#414141',
    },
    variText: {
        fontWeight: 700,
        fontSize: 24,
        lineHeight: 35,
        letterSpacing: 0.15,
        color: '#414141',
    },
    myListView: {
        width: '100%',
        height: '65%',
        backgroundColor: '#fff',
    },
    myListRow: {
        height: '10%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:1,
    },
    myListRowBtn: {
        marginLeft: '7%',
    },
    myListRowBtnText: {
        fontWeight: 700,
        fontSize: 17,
        lineHeight: 25,
        letterSpacing: 0.15,
        color: '#414141',
    },
    myListDetail: {
        paddingHorizontal: '7%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth:1,
    },
    blueText: {
        fontWeight: 700,
        fontSize: 19,
        lineHeight: 28,
        letterSpacing: 0.15,
        color: Variables.btnColor,
    },
    moneyText: {
        fontWeight: 700,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0.15,
        color: '#414141',
    },
});