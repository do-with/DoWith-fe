import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { BoardList } from "../components/BoardList";
import { ipAddress } from "../ipAddress";
import { AuthContext } from "../contexts/AuthContext";
import BtnSm from "../components/BtnSm";
import Moment from "moment";
import axios from "axios";

function SecondCsPage({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const id = route.params.id;

  const loadPosts = () => {
    axios
      .get(`http://${ipAddress}:8080/post/board/${id}`)
      .then((response) => {
        const loadedPosts = response.data;
        setPost([...loadedPosts]);
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

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="문의하기" />
      <View style={styles.csSecondPageContent}>
        <ScrollView>
          <View style={styles.btnSmView}>
            <BtnSm title="최신순" />
            <BtnSm
              primary
              color={"white"}
              title="글쓰기"
              onPress={() => navigation.push("WritePost", { board_id: id })}
            />
          </View>
          {post
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((post) => {
              let date = post.created_at.toString();
              const formattedDate = Moment(date).format("MM.DD");
              const onClickList = () => {
                navigation.push("ThirdCsPage", { id: post.id });
              };
              const postId = post.id;
              const answerYn = post.answer_yn.toString();
              const getAnserYn = (answerYn) => {
                if (answerYn === "false") {
                  return "답변 대기";
                } else if (answerYn === "true") {
                  return "답변 완료";
                }
                return "";
              };
              console.log(user.id, post.user_id);
              return (
                <View style={{ alignItems: "center" }} key={post.id}>
                  <BoardList
                    postId={postId}
                    onClickList={onClickList}
                    title={post.title}
                    createdAt={formattedDate}
                    answerYn={getAnserYn(answerYn)}
                    compare={user.id === post.user_id}
                    reloadPosts={reloadPosts}
                  />
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

export default SecondCsPage;

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    overflow: "hidden",
  },
  csSecondPageContent: {
    width: "100%",
    height: "100%",
    top: "15%",
  },
  btnSmView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  csBoardList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  white: {
    backgroundColor: "rgb(255 255 255 / 76%)",
    color: "black",
  },
  boardListView: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    zIndex: 1,
  },
});
