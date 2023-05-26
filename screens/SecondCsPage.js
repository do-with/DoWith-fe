import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { BoardList } from "../components/BoardList";
import { ipAddress } from "../ipAddress";
import BtnSm from "../components/BtnSm";
import Moment from "moment";
import axios from "axios";

function SecondCsPage({ navigation, route }) {
  const [post, setPost] = useState([]);
  const id = route.params.id;
  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/post/board/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="문의하기" />
      <View style={styles.csSecondPageContent}>
        <ScrollView>
          <View style={styles.btnSmView}>
            <BtnSm primary title="최신순" color="white" />
            <BtnSm
              title="글쓰기"
              onPress={() => navigation.push("WritePost", { board_id: id })}
            />
          </View>
          {post.map((post) => {
            let date = post.created_at.toString();
            const formattedDate = Moment(date).format("M.D");
            const onClickList = () => {
              navigation.push("ThirdCsPage", { id: post.id });
            };
            const postId = post.id;
            const answerYn = post.answer_yn.toString();
            const getAnserYn = (answerYn) => {
              if (post.answer_yn === "false") {
                return "";
              } else if (post.answer_yn === "true") {
                return "답변 완료";
              }
              return "";
            };
            return (
              <View style={{ alignItems: "center" }} key={post.id}>
                <BoardList
                  postId={id}
                  onClickList={onClickList}
                  title={post.title}
                  createdAt={formattedDate}
                  answerYn={getAnserYn(post.answer_yn.toString())}
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
