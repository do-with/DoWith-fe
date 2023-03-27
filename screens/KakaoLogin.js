import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

import axios from "axios";

// other import settings...

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const KakaoLogin = ({ navigation }) => {
  function LogInProgress(data) {
    // access code는 url에 붙어 장황하게 날아온다.

    // substringd으로 url에서 code=뒤를 substring하면 된다.
    console.log("LogInProgress 함수 실행");
    console.log(data);

    const exp = "code=";

    var condition = data.indexOf(exp);
    console.log(condition);

    if (condition != -1) {
      var request_code = data.substring(condition + exp.length);

      console.log("access code :: " + request_code);

      // 토큰값 받기

      requestToken(request_code);
    }
  }

  const requestToken = async (request_code) => {
    var returnValue = "none";

    var request_token_url = "https://kauth.kakao.com/oauth/token";
    console.log("requestToken 함수 실행");
    axios({
      method: "post",

      url: request_token_url,

      params: {
        grant_type: "authorization_code",

        client_id: "82ee1e22b77d96174df564b98166f90b",

        redirect_uri: "http://172.19.23.128:8080/api/kakao",

        code: request_code,
      },
    })
      .then(function (response) {
        returnValue = response.data.access_token;
        console.log(response.data.access_token);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=82ee1e22b77d96174df564b98166f90b&redirect_uri=http://172.19.23.128:8080/api/kakao&response_type=code",
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          LogInProgress(event.nativeEvent["url"]);
        }}

        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  );
};

export default KakaoLogin;
