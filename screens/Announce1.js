import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default function Announce1({navigation}){
    const [apiData, setApiData] = useState([]);
    //나머지는 진주랑 얘기해서 저장 형태 결정
    useEffect(() => {
        axios.get('http://172.20.10.4:8888/Announces')
            .then(response => {
                setApiData(response.data.announce)
                console.log("data-first:", response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // console.log("data-second",data);

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
                            <Pressable style={styles.announceBtn}>
                                <Text style={styles.announceBtnText}>기부소식</Text>
                            </Pressable>
                        </LinearGradient>
                        <LinearGradient colors={['#fbfbfbaa', '#fbfbfb', '#ffffffd4']}
                            style={styles.announceBtnLinear}>
                            <Pressable onPress={()=>navigation.navigate('Announce2')}
                                style={styles.announceBtn}>
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
                        <ScrollView
                            contentContainerStyle={{ height: 'auto' }}>
                            {apiData.map((data) => {
                                const apiURL = data.src;
                                const fommattedApiTitle =  data.title.split(',').join('');
                                return (
                                    <View style={styles.listBoxImg}
                                        key={data.id}>
                                        <View style={styles.contentListText}>
                                            <Text style={styles.h3}>{fommattedApiTitle}</Text>
                                            <Text style={styles.span1}>{data.content}</Text>
                                        </View>
                                        <View style={styles.contentListImg}>
                                            <Image source={{uri: apiURL}}
                                                style={styles.img} resizeMode={'contain'}/>
                                        </View>
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
    listBoxImg: {
        width: '100%',
        height: 113,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(214, 214, 214, 0.44)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentListText: {
        width: '66%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '5%',
    },
    h3: {
        fontWeight: 500,
        lineHeight: 25,
        fontSize: 17,
        color:' rgba(35, 35, 35, 0.75)',
        marginBottom: '3%',
    },
    span1: {
        fontSize: 15,
        lineHeight: 22,
        color: 'rgba(35, 35, 35, 0.6)',
        marginBottom: '3%',
    },
    span2: {
        fontSize: 13,
        lineHeight: 19,
        color: 'rgba(111, 111, 111, 0.61)',
    },
    contentListImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '34%',
    },
    img: {
        width: '70%',
        height: '70%',
        borderRadius: 10,
    },
});