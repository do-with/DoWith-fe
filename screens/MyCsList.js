import React, { useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { ipAddress } from '../ipAddress';
import { AuthContext } from '../contexts/AuthContext';
import { BoardList } from '../components/BoardList';
import axios from 'axios';
import Moment from 'moment';

export default function MyCsList({navigation}){
    const { user } = useContext(AuthContext);
    const [myCsList, setMyCsList] = useState([]);

    const loadPosts = () => {
        axios
            .get(`http://${ipAddress}:8080/post/user/${user.id}`)
            .then((response) => {
                const loadedPosts = response.data;
                setMyCsList([...loadedPosts]);
            })
            .catch((error) => console.log(error));
      };
    
      useEffect(() => {
        // 컴포넌트가 마운트될 때 게시글 목록 로딩
        loadPosts();
      }, []);
    
      const reloadPosts = () => {
        loadPosts();
      };

    return(
        <View style={styles.aboutBody}>
            <ScreenHeader headerTitle="문의 내역"/>
            <View style={styles.aboutContent}>
                <View style={{height: '6%', marginLeft: '5%', justifyContent: 'center'}}>
                    <Text style={styles.titleText}>나의 문의 내역</Text>
                </View>
                <View>
                {myCsList
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((myCs) => {
                    let date = myCs.created_at.toString();
                    const formattedDate = Moment(date).format("MM.DD");
                    const onClickList = () => {
                        navigation.push("ThirdCsPage", { id: post.id });
                    };
                    const myCsId = myCs.id;
                    const answerYn = myCs.answer_yn.toString();
                    const getAnserYn = (answerYn) => {
                        if (answerYn === "false") {
                        return "답변 대기";
                        } else if (answerYn === "true") {
                        return "답변 완료";
                        }
                        return "";
                    };
                    return (
                        <View style={{ alignItems: "center" }} key={myCs.id}>
                        <BoardList
                            postId={myCsId}
                            onClickList={onClickList}
                            title={myCs.title}
                            createdAt={formattedDate}
                            answerYn={getAnserYn(answerYn)}
                            compare={user.id === myCs.user_id}
                            reloadPosts={reloadPosts}
                        />
                        </View>
                    );
                })}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    aboutContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '15%',
        display: 'flex',
        flexDirection: 'column',
    },
    titleText: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0.15,
        color: '#353535',
    },
});