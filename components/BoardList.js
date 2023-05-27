import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Pressable, Text, Alert } from "react-native";
import { ipAddress } from "../ipAddress";
import { Ionicons } from '@expo/vector-icons';
import { CommentBottomSheet } from './CommentBottomSheet';
import axios from "axios";

export const BoardList = ({ onClickList, postId, title, createdAt, answerYn, compare, reloadPosts }) => {
  const isSameId = compare;
  const [ modalVisible, setModalVisible ] = useState(false);

  const onPressList = () => {
      setModalVisible(true);
  };

  const onDelete = () => {
    axios
      .delete(`http://${ipAddress}:8080/post/${postId}`, {})
      .then((response) => {
        // 게시글 목록을 다시 로딩합니다.
        reloadPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteConfirm = () => {
    Alert.alert(
      "문의글 삭제",
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

  return (
    <Pressable
      onPress={onPressList}
      style={(pressed) => [styles.csBoardList, styles.csBoardListBtn]}
    >
      <View style={styles.boardListTitle}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: '5%'}}>
          <View
            style={{ width: "80%", height: "200%", wordBreak: "break-all" }}
          >
            <View style={{ flexDirection: "row"}}>
              <Text>Q. </Text>
              <Text>{title}</Text>
            </View>
          </View>
          {isSameId && (
          <Pressable onPress={onDeleteConfirm} style={styles.deleteBtn}>
              <Ionicons name="ios-trash-outline" size={21} color="black" />
          </Pressable>
          )}
        </View>
      </View>
      <View style={{ width: "100%", height: "30%", marginLeft: '10%'}}>
        <Text>{createdAt}</Text>
        <Text>{answerYn}</Text>
      </View>

      <CommentBottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          postId={postId}
      />
    </Pressable>      

  );
};

const styles = StyleSheet.create({
  csBoardList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  csBoardListBtn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: 103,
    width: "93%",
    marginBottom: "2%",
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 8,
    shadowColor: "#707070",
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0,
    elevation: 1,
  },
  boardListTitle: {
    width: "100%",
    height: "28%",
    display: "flex",
    marginTop: "2%",
    flexDirection: "column",
  },
  deleteBtn: {
    width: 40,
  },
  boardListSubTitle: {
    width: "100%",
    height: "28%",
    display: "flex",
    justifyContent: "flex-end",
  },
});
