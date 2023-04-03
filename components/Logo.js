import React from 'react';
import { StyleSheet, View, Image, Link } from 'react-native';
// import {vw, vh} from 'react-native-viewport-units';
// import logo from "../assets/logo.png"

export default function Logo(){
    return(
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')}
                    style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

    logo: {
        width: '100%',
        height: '100%',
    },
    // logo > a > img : {
    //     width: '19px',
    //     height: '23px',
    // },
    
    // @media (min-width: 720px){
    //     .logo > a > img {
    //         width: 30px;
    //         height: 35px;
    //     }
    // }
    
});