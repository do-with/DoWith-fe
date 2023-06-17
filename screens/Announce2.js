import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, Pressable, ScrollView } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ipAddress } from '../ipAddress';

export default function Announce2({navigation}){
    const [noticeData, setNoticeData] = useState([]);
    useEffect(() => {
        axios.get(`http://${ipAddress}:8888/Notices`)
            .then(response => {
                setNoticeData(response.data.Notices)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="알림마당"/>
            <View style={styles.noticeContent}>
                <View style={styles.noticeImgBackground}>
                    <Image source={require('../assets/announce-back.png')}
                        style={styles.noticeImg} resizeMode={'contain'}/>
                    <View style={styles.noticeBtnView}>
                        <LinearGradient colors={['#fbfbfbaa', '#fbfbfb', '#ffffffd4']}
                            style={styles.noticeBtnLinear}>
                            <Pressable onPress={()=>navigation.navigate('Announce1')}
                                style={styles.noticeBtn}>
                                <Text style={styles.noticeBtnText}>기부소식</Text>
                            </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#fbfbfbaa', '#fbfbfb', '#ffffffd4']}
                            style={styles.noticeBtnLinear}>
                            <Pressable style={styles.noticeBtn}>
                                <Text style={styles.noticeBtnText}>공지사항</Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </View>
                
                <View style={styles.contentListWrap}>
                    <View style={styles.refresh}>
                        <Text style={styles.refreshText}>전체글</Text>
                    </View>
                    {/* <View style={styles.contentList}>
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
                    </View> */}
                    <View style={styles.contentList}>
                        <ScrollView
                            contentContainerStyle={{ height: 'auto' }}>
                            {noticeData.map((notice) => {
                                return (
                                    <View style={styles.listBoxNoImg}
                                        key={notice.id}>
                                        <View style={styles.contentListText}>
                                            <Text style={styles.h3}>{notice.title}</Text>
                                            {/* <Text style={styles.span}>글쓴이 이름</Text> */}
                                        </View>
                                        {/* <View style={styles.contentListSubText}>
                                            <Text style={styles.dateText}>2023-03-31</Text>
                                            <Text style={styles.hitText}>조회수 21</Text>
                                        </View> */}
                                    </View>
                                )}
                            )}
                        </ScrollView>
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
    noticeContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
    },
    noticeImgBackground: {
        position: 'relative',
        width: '100%',
        height: '20%',
        display: 'flex',
        alignItems: 'flex-end',
    },
    noticeImg: {
        // width: 460,
        // height: 185,
        width: 415,
        height: 168,
        left: -1,
    },
    noticeBtnView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: '5%',
    },
    noticeBtnLinear: {
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
    noticeBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noticeBtnText: {
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
        height: '6%',
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
        height: '75%',
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