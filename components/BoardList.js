import React from 'react';
import { StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import { ipAddress } from '../ipAddress';
import axios from 'axios';

export const BoardList = ({ onClickList, id, title, createdAt, answerYn}) => {
    const onDelete = () => {
        const post_id = id;
        axios
          .delete(`http://${ipAddress}:8080/post/${post_id}`, {})
          .then(() => {
            // 게시글 목록을 다시 로딩합니다.
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const onDeleteConfirm = () => {
        Alert.alert(
          "글 삭제",
          "정말로 삭제하시겠습니까?",
          [
            {
              text: "취소",
              style: "cancel",
            },
            {
              text: "삭제",
              onPress: onDelete,
            },
          ],
          { cancelable: false }
        );
      };
    
    return(
        <Pressable
            onPress={()=>onClickList()}
            style={(pressed) => [
                styles.csBoardList, 
                styles.csBoardListBtn
        ]}>
            <View style={styles.boardListTitle}>
                <View>
                    <Text>Q. {title}</Text>
                    <Pressable onPress={onDeleteConfirm}
                        style={styles.deleteBtn}>
                        <Text>x</Text>
                    </Pressable>
                </View>
                <Text>{createdAt}</Text>
            </View>
            <View>
                <Text>{answerYn}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    csBoardList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    csBoardListBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 103,
        // width: '90%',
        width: '93%',
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
    boardListTitle: {
        width: '100%',
        height: '28%',
        display: 'flex',
        marginTop: '2%',
        flexDirection: 'column',
    },
    deleteBtn: {
        width: 40,
        borderWidth: 2,
    },
    boardListSubTitle: {
        width: '100%',
        height: '28%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
});