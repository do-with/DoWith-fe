import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, Dimensions, Alert } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { CustomInput } from "../components/CustomInput";
import { Variables } from "../components/Variables";
import { ipAddress } from "../ipAddress";
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

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
          navigation.navigate('MainScreen');
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
            <Pressable style={styles.btnLoginBox}
              onPress={onClickLoginBtn}>
              <Text style={styles.whiteText}>로그인</Text>
            </Pressable>
          </View>
          <View style={styles.basicBtnJoinTrans}>
            <Pressable style={styles.btnJoinBox}
              onPress={() => navigation.navigate("JoinScreen")}>
              <Text>회원가입</Text>
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
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    backgroundColor: Variables.btnColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnJoinBox: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.03,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
  },
  basicBtnJoinTrans: {
    position: 'relative',
    display: 'flex',
    // boxSizing: 'border-box',
    paddingLeft: '7%',
  },
  img: {
    width: 170,
    height: 80,
  },
});