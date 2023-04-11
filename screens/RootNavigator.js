import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import KakaoLogin from "./KakaoLogin";
import MainScreen from './MainScreen';
import DonateScreen from './DonateScreen';
import FirstCsPage from './FirstCsPage';
import SecondCsPage from "./SecondCsPage";
import NearByStore from './NearByStore';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstCsPage">
        <Stack.Screen name="MainScreen" options={{headerShown:false}} component={MainScreen}/>
        <Stack.Screen name="DonateScreen" options={{headerShown: false}} component={DonateScreen}/>
        <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="KakaoLogin" options={{headerShown: false}} component={KakaoLogin} />
        <Stack.Screen name="FirstCsPage" options={{headerShown: false}} component={FirstCsPage} />
        <Stack.Screen name="SecondCsPage" options={{headerShown: false}} component={SecondCsPage} />
        <Stack.Screen name="NearByStore" options={{headerShown: false}} component={NearByStore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}