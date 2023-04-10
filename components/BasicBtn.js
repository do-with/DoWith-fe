import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { Variables } from './Variables';

const BasicBtn = ({ onPress, title}) => {
    return(
        <Pressable
            onPress={onPress}
            style={(pressed) => [
                styles.btnSm
            ]}>
            <Text style={{color: 'white'}}>{title}</Text>
        </Pressable>
    );
};

export default BasicBtn;

const styles = StyleSheet.create({
    btnSm: {
        width: 64,
        height: 30,
        marginVertical: 10,
        marginHorizontal: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: Variables.btnColor,
        borderTopWidth: 1,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderLeftWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(11, 14, 18, 0.13)',
        boxShadow: '2px 3px 3px rgba(137, 189, 218, 0.2)',
        borderRadius: 5,
    }
});