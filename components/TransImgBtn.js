import React from 'react';
import { StyleSheet, Pressable, Text, Dimensions, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TransImgBtn = ({ onPress, url, title, subtitle }) => {
    return(
        <Pressable
            onPress={onPress}
            style={(pressed) => [
                styles.transImgBtn
            ]}>
            <Image source={url} 
                style={styles.img} resizeMode={"contain"}/>
            <Text
                style={{fontSize: 15, fontWeight: 'bold'}}
            >
                {title}    
            </Text>
            <Text>{subtitle}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    transImgBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '99%',
        marginLeft: 5,
    },
    img: {
        width: 50,
        height: 50,
    }
});