import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { ipAddress } from '../ipAddress';
import Moment from 'moment';
import axios from 'axios';

export default function Notification({navigation}){
    const [notiList, setNotiList] = useState([]);
    const user_id = 1;

    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/notification/user/${user_id}`)
            .then(response => setNotiList(response.data))
            .catch(error => console.log(error))
      }, []);

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="알림"/>
            <View style={styles.joinContent}>
                {notiList.map((notiList) => {
                    let date = notiList.created_at.toString();
                    const formattedDate = Moment(date).format('d MMM');
                    return(
                        <View style={styles.notiBoardList}
                            key={notiList.id}>
                            <View style={styles.notiBoardListContent}>
                                <View>
                                    <Image source={require("../assets/donator.png")}
                                        style={styles.notiImg} resizeMode={'contain'} />
                                </View>
                                <Text style={styles.notiText}>{notiList.message}</Text>
                                <Pressable>
                                    <Text style={styles.notiIcon}>x</Text>
                                </Pressable>
                            </View>
                            <View style={{borderWidth: 1,}}>
                                <Text style={styles.notiText}>{formattedDate}</Text>
                            </View>
                        </View>
                    )
                })}
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
    },
    notiBoardList: {
        display: 'flex',
        flexDirection: 'column',
        width: '93%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '2%',
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 8,
        shadowColor: '#707070',
        shadowOffset: {
            width: 1.5,
            height: 1.5,
        },
        shadowOpacity: 0.23,
        shadowRadius: 0,
        elevation: 1,
    },
    notiBoardListContent: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        height: '13%',
    },
    notiImg: {
        width: 30,
        height: 30,
        borderWidth: 1,
    },
    notiText: {
        display: 'flex',
    },
    notiIcon: {
        borderWidth: 1,
    },
});