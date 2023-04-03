import React from 'react';
import { StyleSheet, View } from 'react-native';
// import {vw, vh} from 'react-native-viewport-units';

export default function BasicBtn(){
    return(
        <View style={styles.basicBtn}>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      basicBtn: {
        color: 'rgba(0, 0, 0, 0.63)',
        border: 'none',
        width: '147px',
        height: '60px',
        boxShadow: '1px 2px 2px 1px rgba(182, 182, 182, 0.179)',
        borderRadius: '8px',
        backgroundColor: 'white',
        fontSize: '16px',
        fontWeight: 700,
        letterSpacing: '2px',
        margin: '7px 0px',
    },
});    
    // basicBtn > input : {
    //     color: 'rgba(0, 0, 0, 0.63)',
    //     border: 'none',
    //     width: '147px',
    //     height: '60px',
    //     boxShadow: '1px 2px 2px 1px rgba(182, 182, 182, 0.179)',
    //     borderRadius: '8px',
    //     backgroundColor: 'white',
    //     fontSize: '16px',
    //     fontWeight: 700,
    //     letterSpacing: '2px',
    //     margin: '7px 0px',
    // },
    // @media (min-width: 720px) {
    //     .basic-btn> input {
    //         font-size: 25px;
    //         margin: 10px 0px;
    //     }
    //     .login-content_submit > input{
    //         font-size: 19pt;
    //         letter-spacing: 5px;
    //     }
        
    // }
 