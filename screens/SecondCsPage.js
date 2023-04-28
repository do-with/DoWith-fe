import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Pressable, TouchableOpacity } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import BtnSm from "../components/BtnSm";
import { BoardList } from "../components/BoardList";
import Moment from 'moment';
import axios from 'axios';
import {ipAddress} from '../ipAddress';

function SecondCsPage({ navigation, route }) {
    const [post, setPost] = useState([]);
    const id =  route.params.id;
    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/post/board/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.log(error))
      }, []);
      
  return (
    <View style={styles.joinBody}>
        <ScreenHeader headerTitle="문의하기"/>
        <View style={styles.csSecondPageContent}>
            <ScrollView>
                <View style={styles.btnSmView}>
                    <BtnSm primary title="최신순" color="white"/>
                    <BtnSm title="글쓰기" 
                        onPress={()=>navigation.push("WritePost", {board_id: id})}/>
                </View>
                {post.map((post) => {
                    let date = post.created_at.toString();
                    const formattedDate = Moment(date).format('d MMM');
                    const onClickList = () => {
                        navigation.push("ThirdCsPage", {id: post.id});
                    };
                    return(
                        <View key={post.id}>
                            <BoardList
                                onClickList={onClickList}
                                title={post.title}
                                createdAt={formattedDate}
                                answerYn={post.answer_yn.toString()}
                            />
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
        borderWidth: 5,
        zIndex: 1,
    }
});