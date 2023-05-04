import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Pressable, TextInput } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { ipAddress } from '../ipAddress';
import { Variables } from '../components/Variables';
import axios from 'axios';

export default function WritePost({navigation, route}){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const user_id = 1;
    
    const board_id = route.params.board_id;

    const onSubmit = () => {
        if (title && content) {
            const created_at = new Date();
            const data = {
                user_id: user_id,
                title: title,
                content: content,
                email: created_at,
            };
            axios.post(`http://${ipAddress}:8080/post/board/${board_id}/user/${user_id}`, data, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    // 데이터가 성공적으로 전송되면 FirstCsPage 이동합니다.
                    navigation.navigate('FirstCsPage');
                })
                .catch(error => console.log(error));
        } 
    };
    const getBoardName = (board_id) => {
        if (board_id === 1) {
          return '기부자 문의';
        }
        else if (board_id === 2) {
          return '기타 문의';
        }
        return '기부자 문의';
      };

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="문의하기" />
            <View style={styles.writePostContent}>
                <Text>게시판 글쓰기</Text>
                <View>
                    <View>
                        <Text>분류</Text>
                        <Text>{getBoardName(board_id)}</Text>
                    </View>
                    <View>
                        <Text>제목</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="제목"       
                            style={styles.input}    
                        />
                    </View>
                    <View>
                        <Text>내용</Text>
                        <TextInput
                            value={content}
                            onChangeText={setContent}
                            placeholder="내용을 입력해주세요"       
                            style={styles.input}    
                        />
                    </View>
                </View>
                <Pressable style={styles.submitBtn}
                    onPress={onSubmit}>
                    <Text style={styles.submitBtnText}>완료</Text>
                </Pressable>
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
    writePostContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '13%',
        backgroundColor: Variables.mainColor,
    },
    input: {
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    submitBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: '6%',
        backgroundColor: Variables.btnColor,
        borderRadius: 5,
    },
    submitBtnText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});