import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import {ipAddress} from '../ipAddress';
import axios from 'axios';
import Moment from 'moment';

function SecondCsPage({ navigation, route }) {
    const [postConetent, setPostContent] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const id =  route.params.id;
    
    let postdate = postConetent.created_at;
    const formattedPostDate = Moment(postdate).format('yyyy-M-D');

    let commentDate = commentList.created_at;
    const formattedCommentDate = Moment(commentDate).format('M.D');

    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/post/${id}`)
            .then(response => setPostContent(response.data))
            .catch(error => console.log(error))
      }, []);

    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/comment/post/${id}`)
            .then(response => setCommentList(response.data))
            .catch(error => console.log(error))
    }, []);
      
    return (
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="문의하기"/>
            <View style={styles.csSecondPageContent}>
                <ScrollView>
                    <View style={styles.boardListView}>
                        <View>
                            <Text>{postConetent.title}</Text>
                            <Text>{formattedPostDate}</Text>
                        </View>
                        
                        <Text>{postConetent.content}</Text>
                    </View>
                    {commentList.map((commentList) => {
                    return(
                        <View key={commentList.id}>
                            <Image source={require('../assets/donator.png')}
                                style={styles.img} resizeMode='contain' />
                            <Text>관리자 1</Text>
                            <Text>{commentList.content}</Text>
                            <Text>{formattedCommentDate}</Text>
                        </View>
                    )
                })}
                </ScrollView>
            </View>
        </View>
    );
}

export default SecondCsPage;

const styles = StyleSheet.create({
    joinBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    csSecondPageContent: {
        width: '100%',
        height: '100%',
        top: '15%',
    },
    btnSmView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    csBoardList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    white: {
        backgroundColor: 'rgb(255 255 255 / 76%)',
        color: 'black',
    },
    boardListView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 20,
        height: 20,
    }
});