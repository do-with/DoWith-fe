import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import KakaoLogin from "./KakaoLogin";
import MainScreen from './MainScreen';
import DonateScreen from './DonateScreen';
import FirstCsPage from './FirstCsPage';
import SecondCsPage from "./SecondCsPage";
import ThirdCsPage from './ThirdCsPage';
import NearByStore from './NearByStore';
import AboutScreen from './AboutScreen';
import Announce1 from './Announce1';
import WritePost from "./WritePost";
import JoinScreen1 from './JoinScreen1';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="JoinScreen1">
        <Stack.Screen name="MainScreen" options={{headerShown:false}} component={MainScreen}/>
        <Stack.Screen name="DonateScreen" options={{headerShown: false}} component={DonateScreen}/>
        <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="KakaoLogin" options={{headerShown: false}} component={KakaoLogin} />
        <Stack.Screen name="JoinScreen1" options={{headerShown: false}} component={JoinScreen1} />
        <Stack.Screen name="FirstCsPage" options={{headerShown: false}} component={FirstCsPage} />
        <Stack.Screen name="SecondCsPage" options={{headerShown: false}} component={SecondCsPage} />
        <Stack.Screen name="ThirdCsPage" options={{headerShown: false}} component={ThirdCsPage} />
        <Stack.Screen name="WritePost" options={{headerShown: false}} component={WritePost} />
        <Stack.Screen name="NearByStore" options={{headerShown: false}} component={NearByStore} />
        <Stack.Screen name="AboutScreen" options={{headerShown: false}} component={AboutScreen} />
        <Stack.Screen name="Announce1" options={{headerShown: false}} component={Announce1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}