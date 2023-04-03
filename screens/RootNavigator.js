import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import KakaoLogin from "./KakaoLogin";
import ScreenHeader from '../components/ScreenHeader';
import MainScreen from './MainScreen';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="ScreenHeader" options={{headerShown:false}} component={ScreenHeader}/>
        <Stack.Screen name="MainScreen" options={{headerShown:false}} component={MainScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}