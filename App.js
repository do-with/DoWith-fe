import Root from './screens/RootNavigator';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Image} from "react-native";

function App(){
  // const[loading, setLoading] = useState(true);

  // const getReady = () => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 1000);

  // }

  // useEffect(()=> {
  //   getReady();
  // }, []);
  
  // return loading ? (
  //   <View style={styles.loadingView}>
  //     <Image
  //           resizeMode={"cover"}
  //           source={require("./assets/splash.jpg")}
  //           style={styles.imageStyle}></Image>
  //   </View>
  // ):(
  //       <Root />
  // )
  return (
    <Root />
  );
};

export default App;

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})