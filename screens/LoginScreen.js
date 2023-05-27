import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, Dimensions, Alert } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { CustomInput } from "../components/CustomInput";
import { Variables } from "../components/Variables";
import { ipAddress } from "../ipAddress";
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);

  const onClickLoginBtn = async () => {
      const data = {
        email: email,
        password: password,
      };

      await axios.post(`http://${ipAddress}:8080/user/login`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then(response => {
          const user = response.data;
          console.log(user);

          authContext.login(user);
          navigation.replace('MainScreen');
      })
      .catch(error => {
        console.log(error);
        Alert.alert("아이디 또는 비밀번호를 잘못 입력하였습니다.");
      });
  };

  return (
    <View style={styles.loginBody}>
        <ScreenHeader headerTitle="로그인"/>
        <View style={styles.loginContent}>
          <View style={styles.loginForm}>
            <CustomInput 
              value={email}
              setValue={setEmail}
              placeholder="아이디 입력"
            />
            <CustomInput 
              value={password}
              setValue={setPassword}
              placeholder="비밀번호 입력"
              secureTextEntry
            />
          </View>
          <View style={styles.loginContentSub}>
              <Text>
              </Text>
              <TouchableOpacity href="">
                  <Text>아이디/비밀번호 찾기</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.basicBtnLoginSubmit}>
            <LinearGradient
              colors={["#4A6BAC", "#1B3974"]}
              style={styles.btnLoginBox}>
              <Pressable 
                onPress={onClickLoginBtn}>
                <Text style={styles.loginText}>로그인</Text>
              </Pressable>
            </LinearGradient>
          </View>
          <View style={styles.basicBtnJoinTrans}>
            <Pressable
              onPress={() => navigation.navigate("JoinScreen")}>
              <Text style={styles.joinText}>회원가입</Text>
            </Pressable>
          </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  loginBody: {
    width: '100%',
    height: windowHeight,
    backgroundColor: 'white',
    wordWrap: 'break-word',
  },
  loginContent: {
    width: '100%',
    backgroundColor: 'white',
    height: '95%',
    paddingTop: 100,
  },
  loginForm:{
    position: 'relative',
    width: '100%',
    height: '30%',
    top: '10%',
  },
  loginContentSub: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '94%',
    position: 'relative',
    marginTop: '3%',
    right: '3%',
  },
  basicBtnLoginSubmit: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '1%',
    height: '12%',
  },
  btnLoginBox:{
    width: '83%',
    height: windowHeight * 0.07,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontWeight: 700,
    fontSize: 19,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: '#fff',
  },
  basicBtnJoinTrans: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '2%',
    paddingRight: '10%',
  },
  joinText: {
    fontWeight: 700,
    fontSize: 17,
    lineHeight: 26,
    color: '#003C7C',
  },
});