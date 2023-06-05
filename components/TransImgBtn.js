import React from 'react';
import { StyleSheet, Pressable, Text, Dimensions, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TransImgBtn = ({ onPress, url, title, subtitle }) => {
    let imgStyle = styles.donatorImg;
    if (title === "대량 기부") {
        imgStyle = styles.massImg;
    } 
    else if (title === "소량 기부") {
        imgStyle = styles.smallImg;
    } 
    else if (title === "기부자 문의") {
        imgStyle = styles.donatorImg;
    } 
    else {
        imgStyle = styles.otherImg;
    }
    return(
        <Pressable
            onPress={onPress}
            style={(pressed) => [
                styles.transImgBtn
            ]}>
            <Image source={url} 
                style={imgStyle} resizeMode={"contain"}/>
            <Text
                style={styles.bold}
            >
                {title}    
            </Text>
            <Text style={styles.thin}>{subtitle}</Text>
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
    massImg: {
        width: 75,
        height: 57,
        marginBottom: '2%',
    },
    smallImg: {
        width: 57,
        height: 57,
        marginBottom: '2%',
    },
    donatorImg: {
        width: 40,
        height: 40,
        marginBottom: '1%',
    },
    otherImg: {
        width: 50,
        height: 50,
    },
    bold: {
        fontWeight: 700,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0.5,
        color: 'rgba(36, 36, 36, 0.92)',
    },
    thin: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 20,
        color: 'rgba(0, 0, 0, 0.36)',
    },
});