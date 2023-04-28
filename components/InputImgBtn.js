import React, { useState } from 'react';
import { StyleSheet, Pressable, Text, Image} from 'react-native';
import { Variables } from './Variables';

export const InputImgBtn = ({ onPress, url, title, selected }) => {
    
    const btnStyle = {
        backgroundColor: selected ? Variables.btnColor:  '#FFFFFF',
        color: selected? '#fff' : '#000',
    };

    return(
        <Pressable
            onPress={onPress}
            style={(pressed) => [
                styles.InputImgBtn,
                selected && btnStyle
            ]}>
            <Image source={url} 
                style={styles.img} resizeMode={"contain"}/>
            <Text
                style={[styles.btnText, selected && btnStyle]}
            >
                {title}    
            </Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    InputImgBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '43%',
        height: '83%',
        // backgroundColor: 'rgba(95, 94, 94, 0.71)',
        borderRadius: 10,
    },
    img: {
        width: 40,
        height: 40,
    },
    btnText:{
        fontSize: 15,
        fontWeight: 'bold',
    }
});