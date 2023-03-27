import { View, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Login화면 열기"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

export default HomeScreen;
