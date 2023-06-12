import "text-encoding-polyfill";
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from "react-native";
import RootNavigator from './screens/RootNavigator';
import { AuthProvider } from "./contexts/AuthContext";
import { Variables } from './components/Variables';

function App(){
  const[loading, setLoading] = useState(true);

  const getReady = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);

  }

  useEffect(()=> {
    getReady();
  }, []);

  return loading ? (
      <View style={styles.loadingView}>
        <Image
            resizeMode={"cover"}
            source={require("./assets/splash.png")}
            style={styles.imageStyle}
        />
      </View>
  ):(
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
  )
};

export default App;

const styles = StyleSheet.create({
  imageStyle: {
    width: '110%',
    height: '115%',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Variables.mainColor,
  }
})