import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable, TextInput } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { ipAddress } from '../ipAddress';
import axios from 'axios';

export default function WritePost({navigation, route}){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const user_id = 1;
    const board_id = route.params.board_id;

    const onSubmit = () => {
        useEffect(() => {
            axios.post(`http://${ipAddress}:8080/post/board/${board_id}/user/${user_id}`,
            {
                title: title,
                content: content,
            })
                .then(response => setPost(response.data))
                .catch(error => console.log(error))
          }, []);
    };
    

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="글쓰기" />
            <View style={styles.writePostContent}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="제목"       
                    style={styles.input}    
                />
                <TextInput
                    value={content}
                    onChangeText={setContent}
                    placeholder="내용"       
                    style={styles.input}    
                />
                <Pressable onClick={onSubmit}>
                    <Text>작성</Text>
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
    },
    input: {
        height: 100,
    },
});