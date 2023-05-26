import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Variables } from '../components/Variables';
import { LinearGradient } from 'expo-linear-gradient';

export default function AfterSupport({navigation}){
    return (
        <View style={styles.joinBody}>
          <ScreenHeader />
          <View style={styles.aiContent}>
            <Image
              source={require("../assets/donate-done.gif")}
              style={styles.doneImg}
              resizeMode={"contain"}
            />
    
            <Text style={styles.doneTitle}>따뜻한 마음 전달 감사합니다!</Text>
            <Text style={styles.grey}>후원이 정상적으로 처리되었습니다.</Text>
            <LinearGradient
              colors={["#4A6BAC", "#1B3974"]}
              style={styles.imgBackground}
            >
              <Pressable
                style={styles.imgBackgroundBtn}
                onPress={() => navigation.navigate("MainScreen")}
              >
                <Text style={styles.submitBtnText}>홈으로 돌아가기</Text>
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
        backgroundColor: "white",
        alignItems: "center",
        wordBreak: "break-all",
        backgroundColor: Variables.mainColor,
    },
    aiContent: {
        width: "87%",
        height: "100%",
        // position: "relative",
        top: "20%",
        display: "flex",
        alignItems: "center",
    },
    doneImg: {
        position: "relative",
        width: "57%",
        height: "25%",
        backgroundColor: "transparent",
    },
    doneTitle: {
        fontWeight: 700,
        fontSize: 22,
        color: Variables.btnColor,
        marginVertical: "5%",
    },
    submitBtnText: {
        color: "#fff",
        fontWeight: 700,
        fontSize: 19,
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
        fontSize: 15,
        color: "white",
        boxShadow: "2px 3px 3px rgba(117, 147, 106, 0.2)",
        width: "100%",
        height: "8%",
        marginTop: "40%",
    },
    imgBackgroundBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    grey: {
        color: "grey",
        fontSize: 15,
        lineHeight: 20,
    },
});