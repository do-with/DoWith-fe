import React from 'react';
import { StyleSheet, View } from 'react-native';
// import {vw, vh} from 'react-native-viewport-units';

export default function Banner(){
    return(
        <View style={styles.contentBanner}>
        </View>
    );
};

const styles = StyleSheet.create({
    contentBanner: {
        position: 'relative',
        width: '100%',        
        height: '26%',
        color: "black",
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
});

// .content-banner > .single-item:nth-child(n) {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }

// @media (min-width: 720px){
//     .content-banner{
//         height: 35%;
//     }
// }