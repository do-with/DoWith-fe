import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { ipAddress } from "../ipAddress";
import { Variables } from "../components/Variables";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export default function WritePost({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
      axios
        .post(
          `http://${ipAddress}:8080/post/board/${board_id}/user/${user_id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          // 데이터가 성공적으로 전송되면 FirstCsPage 이동합니다.
          navigation.navigate("FirstCsPage");
        })
        .catch((error) => console.log(error));
    }
  };
  const getBoardName = (board_id) => {
    if (board_id === 1) {
      return "기부자 문의";
    } else if (board_id === 2) {
      return "기타 문의";
    }
    return "기부자 문의";
  };

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="문의하기" />
      <View style={styles.writePostContent}>
        <View style={styles.boardTitle}>
          <Text style={{ fontWeight: 600, fontSize: 15 }}>게시판 글쓰기</Text>
          <Text>{getBoardName(board_id)}</Text>
        </View>
        <View>
          <View>
            <Text style={styles.text}>제목</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="제목"
              style={styles.titleInput}
            />
          </View>
          <View>
            <Text style={styles.text}>내용</Text>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="내용을 입력해주세요"
              style={styles.input}
            />
          </View>
        </View>
        <LinearGradient
          colors={["#4A6BAC", "#1B3974"]}
          style={styles.imgBackground}
        >
          <Pressable style={styles.imgBackgroundBtn} onPress={onSubmit}>
            <Text style={styles.submitBtnText}>완료</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    backgroundColor: Variables.mainColor,
    wordBreak: "break-all",
    alignItems: "center",
  },
  writePostContent: {
    width: "87%",
    height: "45%",
    position: "relative",
    top: '14%',
  },
  input: {
    height: "75%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: "2%",
    paddingHorizontal: "5%",
  },
  submitBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: "6%",
    backgroundColor: Variables.btnColor,
    borderRadius: 5,
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  imgBackground: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(13, 27, 43, 0.35)",
    borderRadius: 5,
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
    color: "white",
    boxShadow: "2px 3px 3px rgba(117, 147, 106, 0.2)",
    width: "37%",
    height: "15%",
    marginTop: "13%",
    left: "64%",
  },
  imgBackgroundBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleInput: {
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: "2%",
    marginBottom: "-27%",
    paddingHorizontal: "5%",
  },
  boardTitle: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginVertical: "10%",
    alignItems: "flex-end",
  },
  text: {
    paddingLeft: "3%",
    marginBottom: "2%",
  },
});
