import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
// import {vw, vh} from 'react-native-viewport-units';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TransImgBtn(){
    return(
        <TouchableOpacity style={styles.transImgBtn}>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    transImgBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth * 0.25,
        height: windowHeight * 0.99,
        marginLeft: '5px',
        backgroundColor: 'black',
    }
});