import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { ipAddress } from "../ipAddress";
import { Variables } from "../components/Variables";
import { AuthContext } from "../contexts/AuthContext";
import Moment from "moment";
import axios from "axios";

export default function Notification({navigation}){
    const [notiList, setNotiList] = useState([]);

    const { user } = useContext(AuthContext);
    const userId = user.id;

    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/notification/user/${userId}`)
            .then(response => setNotiList(response.data))
            .catch(error => console.log(error))
      }, []);

  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="알림" />
      <View style={styles.joinContent}>
        {notiList.map((notiList) => {
          let date = notiList.created_at.toString();
          const formattedDate = Moment(date).format("M.d");
          return (
            <View style={styles.notiBoardList} key={notiList.id}>
              <View>
                <Image
                  source={require("../assets/donator.png")}
                  style={styles.notiImg}
                  resizeMode={"contain"}
                />
              </View>
              <View style={styles.notiBoardListContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.notiText}>{notiList.message}</Text>
                  <Pressable>
                    <Text style={styles.notiIcon}>x</Text>
                  </Pressable>
                </View>
                <View>
                  <Text style={(styles.notiText, styles.date)}>
                    {formattedDate}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
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
  },
  joinContent: {
    width: "100%",
    height: "100%",
    position: "relative",
    alignItems: "center",
    top: "16%",
  },
  notiBoardList: {
    display: "flex",
    flexDirection: "row",
    width: "93%",
    height: "12%",
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: "12%",
  },
  notiBoardListContent: {
    display: "flex",
    flexDirection: "column",
    height: "50%",
    width: "100%",
    alignContent: "space-between",
    justifyContent: "space-around",
  },
  notiImg: {
    width: 30,
    height: 30,
    marginRight: "7%",
  },
  notiText: {
    display: "flex",
    fontSize: 15,
  },
  notiIcon: {
    paddingBottom: "5%",
  },
  date: {
    color: "grey",
  },
});
