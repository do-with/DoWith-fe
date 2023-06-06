import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen";
import DonateScreen from "./DonateScreen";
import FirstCsPage from "./FirstCsPage";
import SecondCsPage from "./SecondCsPage";
import NearByStore from "./NearByStore";
import AboutScreen from "./AboutScreen";
import Announce1 from "./Announce1";
import WritePost from "./WritePost";
import JoinScreen from "./JoinScreen";
import Notification from "./Notification";
import MyPage from "./MyPage";
import SupportMoney from "./SupportMoney";
import AfterSupport from "./AfterSupport";
import Static from "./Static";
import AfterDonate from "./AfterDonate";
import LocalTrade from "./LocalTrade";
import DonateScreen2 from "./DonateScreen2";
import Announce2 from "./Announce2";
import RegisterLocalTrade from "./RegisterLocalTrade";
import DetailLocalTrade from "./DetailLocalTrade";
import CheckDonation from "./CheckDonation";
import CheckToken from "./CheckToken";
import MyLocalTradeList from "./MyLoaclTradeList";
import MyCsList from "./MyCsList";
// import Nginx from "./Nginx";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="JoinScreen"
          options={{ headerShown: false }}
          component={JoinScreen}
        />
        <Stack.Screen
          name="Notification"
          options={{ headerShown: false }}
          component={Notification}
        />
        <Stack.Screen
          name="MyPage"
          options={{ headerShown: false }}
          component={MyPage}
        />
        <Stack.Screen
          name="LoginScreen"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="MyLocalTradeList"
          options={{ headerShown: false }}
          component={MyLocalTradeList}
        />
        <Stack.Screen
          name="MyCsList"
          options={{ headerShown: false }}
          component={MyCsList}
        />
        <Stack.Screen
          name="CheckToken"
          options={{ headerShown: false }}
          component={CheckToken}
        />
        <Stack.Screen
          name="CheckDonation"
          options={{ headerShown: false }}
          component={CheckDonation}
        />


        <Stack.Screen
          name="MainScreen"
          options={{ headerShown: false }}
          component={MainScreen}
        />
        <Stack.Screen
          name="NearByStore"
          options={{ headerShown: false }}
          component={NearByStore}
        />
        <Stack.Screen
          name="Announce1"
          options={{ headerShown: false }}
          component={Announce1}
        />
        <Stack.Screen
          name="Announce2"
          options={{ headerShown: false }}
          component={Announce2}
        />
        <Stack.Screen
          name="Static"
          options={{ headerShown: false }}
          component={Static}
        />
        <Stack.Screen
          name="AboutScreen"
          options={{ headerShown: false }}
          component={AboutScreen}
        />

        <Stack.Screen
          name="FirstCsPage"
          options={{ headerShown: false }}
          component={FirstCsPage}
        />
        <Stack.Screen
          name="SecondCsPage"
          options={{ headerShown: false }}
          component={SecondCsPage}
        />
        <Stack.Screen
          name="WritePost"
          options={{ headerShown: false }}
          component={WritePost}
        />

        <Stack.Screen
          name="DonateScreen"
          options={{ headerShown: false }}
          component={DonateScreen}
        />
        <Stack.Screen
          name="DonateScreen2"
          options={{ headerShown: false }}
          component={DonateScreen2}
        />
        <Stack.Screen
          name="AfterDonate"
          options={{ headerShown: false }}
          component={AfterDonate}
        />
        <Stack.Screen
          name="LocalTrade"
          options={{ headerShown: false }}
          component={LocalTrade}
        />
        <Stack.Screen
          name="RegisterLocalTrade"
          options={{ headerShown: false }}
          component={RegisterLocalTrade}
        />

        <Stack.Screen
          name="SupportMoney"
          options={{ headerShown: false }}
          component={SupportMoney}
        />
        <Stack.Screen
          name="AfterSupport"
          options={{ headerShown: false }}
          component={AfterSupport}
        />
        <Stack.Screen
          name="DetailLocalTrade"
          options={{ headerShown: false }}
          component={DetailLocalTrade}
        />
        {/* <Stack.Screen name="Nginx" options={{headerShown: false}} component={Nginx} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
