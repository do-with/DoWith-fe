import React from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';

export default function Announce2({navigation}){
    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="알림마당"/>
            <View style={styles.announceContent}>
                <View style={styles.announceImgBackground}>
                    <Image source={require('../assets/announce-back.png')}
                        style={styles.announceImg} resizeMode={'contain'}/>
                    <View style={styles.announceBtnView}>
                        <LinearGradient colors={['#fbfbfbaa', '#fbfbfb', '#ffffffd4']}
                            style={styles.announceBtnLinear}>
                            <Pressable onPress={()=>navigation.navigate('Announce1')}
                                style={styles.announceBtn}>
                                <Text style={styles.announceBtnText}>기부소식</Text>
                            </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#fbfbfbaa', '#fbfbfb', '#ffffffd4']}
                            style={styles.announceBtnLinear}>
                            <Pressable style={styles.announceBtn}>
                                <Text style={styles.announceBtnText}>공지사항</Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </View>
                
                <View style={styles.contentListWrap}>
                    <View style={styles.refresh}>
                        <Text style={styles.refreshText}>전체글</Text>
                    </View>
                    <View style={styles.contentList}>
                        {/* map으로 */}
                        <View style={styles.listBoxNoImg}>
                            <View style={styles.contentListText}>
                                <Text style={styles.h3}>전산실 전기 공사에 따른 이용..</Text>
                                <Text style={styles.span}>글쓴이 이름</Text>
                            </View>
                            <View style={styles.contentListSubText}>
                                <Text style={styles.dateText}>2023-03-31</Text>
                                <Text style={styles.hitText}>조회수 21</Text>
                            </View>
                        </View>
                    </View>
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
    announceContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
    },
    announceImgBackground: {
        position: 'relative',
        width: '100%',
        height: '20%',
        display: 'flex',
        alignItems: 'flex-end',
    },
    announceImg: {
        // width: 460,
        // height: 185,
        width: 415,
        height: 168,
        left: -1,
    },
    announceBtnView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: '5%',
    },
    announceBtnLinear: {
        display: 'flex',
        borderRadius: 10,
        borderWidth: 0,
        width: '25%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '4%',
        marginBottom: '6%',
    },
    announceBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    announceBtnText: {
        fontWeight: 700,
        fontSize: 13,
        lineHeight: 17,
        color: '#1F1F1F',
    },
    contentListWrap: {
        position: 'relative',
        width: '100%',
        height: 'auto',
    },
    refresh: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '4%',
        height: '17%',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(214, 214, 214, 0.44)',
    },
    refreshText: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 23,
        color: 'rgba(35, 35, 35, 0.8)',
    },
    contentList: {
        display: 'flex',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(214, 214, 214, 0.44)',
    },
    listBoxNoImg: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 113,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(214, 214, 214, 0.44)',
    },
    contentListText: {
        paddingLeft: 0,
        width: '90%',
    },
    h3: {
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 25,
        color: 'rgba(35, 35, 35, 0.91)',
        marginBottom: '2%',
    },
    span: {
        fontSize: 15,
        lineHeight: 22,
        color: 'rgba(35, 35, 35, 0.6)',
        marginBottom: 10,
    },
    contentListSubText: {
        display: 'flex',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 23,
        color: 'rgba(111, 111, 111, 0.99)',
    },
    hitText: {
        fontSize: 17,
        lineHeight: 25,
        color: 'rgba(111, 111, 111, 0.98)',
    },
});