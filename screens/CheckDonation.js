import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Variables } from '../components/Variables';

export default function CheckDonation({navigation}){
    const [selectedTab, setSelectedTab] = useState('전체');
    const [allTabStyle, setAllTabStyle] = useState(styles.myListRowBtnSelectedText);
    const [weekTabStyle, setWeekTabStyle] = useState(styles.myListRowBtnText);

    const onClickTab = (tabName) => {
        if (tabName === '전체') {
            // 전체 리스트
            setSelectedTab(tabName);
            setAllTabStyle(styles.myListRowBtnSelectedText);
            setWeekTabStyle(styles.myListRowBtnText);
        }
        else if (tabName === "일주일") {
            // 일주일 리스트
            setSelectedTab(tabName);
            setAllTabStyle(styles.myListRowBtnText);
            setWeekTabStyle(styles.myListRowBtnSelectedText);
        }
    };

    return(
        <View style={styles.aboutBody}>
            <ScreenHeader headerTitle="기부 횟수"/>
            <View style={styles.aboutContent}>
                <View style={{height: '8%', justifyContent: 'center'}}>
                    <Text style={styles.titleText}>기부 횟수 조회</Text>
                </View>
                <View style={styles.myTokenView}>
                    <Text style={styles.grayText}>기부 횟수</Text>
                    <Image source={require('../assets/pride.png')}
                        resizeMode={'contain'}
                        style={styles.img}
                    />
                    <Text style={styles.variText}>5회</Text>
                </View>

                <View style={styles.myListView}>
                    <View style={styles.myListRow}>
                        <Pressable style={[allTabStyle, styles.myListRowBtn]}
                            onPress={()=>onClickTab('전체')}>
                            <Text style={allTabStyle}>전체</Text>
                        </Pressable>
                        <Pressable style={[weekTabStyle, styles.myListRowBtn]}
                            onPress={()=>onClickTab('일주일')}>
                            <Text style={weekTabStyle}>일주일</Text>
                        </Pressable>
                    </View>
                    {/* map으로 */}
                    <View style={styles.myListDetail}>
                        <View style={styles.myListDetailTitle}>
                            <Text style={styles.blueText}>과자 외</Text>
                            <Text style={styles.grayText}>2023-06-05</Text>
                        </View>
                        <Text style={styles.describeText}>
                            과자 외 물품이 아동센터에 전달되었어요
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(236, 247, 255, 0.25)',
        alignItems: 'center',
    },
    aboutContent: {
        width: '90%',
        height: '100%',
        top: '14%',
        display: 'flex',
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
        height: '15%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: '2%',
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
    },
    myListRow: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    myListRowBtn: {
        marginHorizontal: '3%',
    },
    myListRowBtnText: {
        fontWeight: 700,
        fontSize: 17,
        lineHeight: 25,
        letterSpacing: 0.15,
        color: '#aaa',
    },
    myListRowBtnSelectedText: {
        fontWeight: 700,
        fontSize: 17,
        lineHeight: 25,
        letterSpacing: 0.15,
        color: '#414141',
    },
    myListDetail: {
        paddingLeft: '3%',
        height: '18%',
    },
    myListDetailTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    blueText: {
        fontWeight: 700,
        fontSize: 19,
        lineHeight: 28,
        letterSpacing: 0.15,
        color: Variables.btnColor,
        marginRight: '2%',
    },
    describeText: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.15,
        color: '#414141',
    },
});