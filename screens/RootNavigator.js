import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import MainScreen from './MainScreen';
import DonateScreen from './DonateScreen';
import FirstCsPage from './FirstCsPage';
import SecondCsPage from "./SecondCsPage";
import ThirdCsPage from './ThirdCsPage';
import NearByStore from './NearByStore';
import AboutScreen from './AboutScreen';
import Announce1 from './Announce1';
import WritePost from "./WritePost";
import JoinScreen from './JoinScreen';
import Notification from './Notification';
import MyPage from './MyPage';
import SupportMoney from "./SupportMoney";
import AfterSupport from "./AfterSupport";
import Static from "./Static";
import AfterDonate from "./AfterDonate";
import LocalTrade from "./LocalTrade";
import DonationList from "./DonationList";
import ChargeMoney from './ChargeMoney';
import ChangePoint from "./ChangePoint";
// import Nginx from "./Nginx";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AfterDonate">
        <Stack.Screen name="JoinScreen" options={{headerShown: false}} component={JoinScreen} />

        <Stack.Screen name="Notification" options={{headerShown:false}} component={Notification}/>
        <Stack.Screen name="MyPage" options={{headerShown:false}} component={MyPage}/>
        <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="ChargeMoney" options={{headerShown: false}} component={ChargeMoney} />
        <Stack.Screen name="ChangePoint" options={{headerShown: false}} component={ChangePoint} />
        <Stack.Screen name="DonationList" options={{headerShown: false}} component={DonationList} />

        <Stack.Screen name="MainScreen" options={{headerShown:false}} component={MainScreen}/>
        <Stack.Screen name="NearByStore" options={{headerShown: false}} component={NearByStore} />
        <Stack.Screen name="Announce1" options={{headerShown: false}} component={Announce1} />
        <Stack.Screen name="Static" options={{headerShown: false}} component={Static} />
        <Stack.Screen name="AboutScreen" options={{headerShown: false}} component={AboutScreen} />
        

        <Stack.Screen name="FirstCsPage" options={{headerShown: false}} component={FirstCsPage} />
        <Stack.Screen name="SecondCsPage" options={{headerShown: false}} component={SecondCsPage} />
        <Stack.Screen name="ThirdCsPage" options={{headerShown: false}} component={ThirdCsPage} />
        <Stack.Screen name="WritePost" options={{headerShown: false}} component={WritePost} />

        <Stack.Screen name="DonateScreen" options={{headerShown: false}} component={DonateScreen}/>
        <Stack.Screen name="AfterDonate" options={{headerShown: false}} component={AfterDonate} />

        <Stack.Screen name="LocalTrade" options={{headerShown: false}} component={LocalTrade} />

        <Stack.Screen name="SupportMoney" options={{headerShown: false}} component={SupportMoney} />
        <Stack.Screen name="AfterSupport" options={{headerShown: false}} component={AfterSupport} />
        {/* <Stack.Screen name="Nginx" options={{headerShown: false}} component={Nginx} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}