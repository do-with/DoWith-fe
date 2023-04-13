import React from 'react';
import { StyleSheet, Pressable, Text, Image} from 'react-native';

export const InputImgBtn = ({ onPress, url, title, name }) => {
    return(
        <Pressable
            onPress={onPress}
            style={(pressed) => [
                styles.InputImgBtn,
            ]}>
            <Image source={url} 
                style={styles.img} resizeMode={"contain"}/>
            <Text
                style={{fontSize: 15, fontWeight: 'bold'}}
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
        width: '100%',
        height: '84%',
    },
    img: {
        width: 40,
        height: 40,
    }
});