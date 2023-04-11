import React from 'react';
import { StyleSheet, View} from 'react-native';
// import {vw, vh} from 'react-native-viewport-units';
import { Variables } from './Variables';

export default function navBottom(){
    return(
        <View style={styles.mainNavBottom}>
        </View>
    );
};

const styles = StyleSheet.create({
    mainNavBottom: {
        position: 'fixed',
        width: '100%',
        height: '13%',
        bottom: '0px',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainNavBottomBorder: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '94%',
        height: '75%',
        backgroundColor: 'white',
        border: '1px solid Variables.navBorder',
        borderRadius: '11px',
    },

});