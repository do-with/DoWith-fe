import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Pressable, Text, Alert } from "react-native";
import { ipAddress } from "../ipAddress";
import { Ionicons } from "@expo/vector-icons";
import { CommentBottomSheet } from "./CommentBottomSheet";
import axios from "axios";

export const BoardList = ({
  onClickList,
  postId,
  title,
  createdAt,
  answerYn,
  compare,
  reloadPosts,
}) => {
  const isSameId = compare;
  const [modalVisible, setModalVisible] = useState(false);

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: "5%",
          }}
        >
          <View
            style={{ width: "80%", height: "200%", wordBreak: "break-all" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text>Q. </Text>
              <Text>{title}</Text>
            </View>
          </View>
          {isSameId && (
            <Pressable onPress={onDeleteConfirm} style={styles.deleteBtn}>
              <Ionicons name="ios-trash-outline" size={19} color="grey" />
            </Pressable>
          )}
        </View>
      </View>
      <View
        style={{
          width: "90%",
          height: "30%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "grey", fontSize: 13 }}>{createdAt}</Text>
        <Text style={{ color: "#003C7C" }}>{answerYn}</Text>
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
    marginBottom: "2%",
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: "93%",
    height: 105,
    wordBreak: "break-all",
    shadowColor: "#ddd",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.66,
    shadowRadius: 4,
    elevation: 4,
    overflow: "visible",
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
