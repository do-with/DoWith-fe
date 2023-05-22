
import React from 'react';
import { StyleSheet } from "react-native";
import RootNavigator from './screens/RootNavigator';
import { AuthProvider } from "./contexts/AuthContext";
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
  // return (
  //     <RootNavigator />
  // );
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
      
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