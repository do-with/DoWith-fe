import { View, Button } from "react-native";

function LoginScreen({ navigation }) {
  return (
    <View>
      <Button
        title="KakaoLogin 실행"
        onPress={() => navigation.navigate("KakaoLogin")}
      />
    </View>
  );
}

export default LoginScreen;
