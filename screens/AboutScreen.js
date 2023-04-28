import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { InputImgBtn } from '../components/InputImgBtn';

export default function AboutScreen({navigation}){
    const [showImg, setShowImg] = useState('a');
    
    const toggleImg1 = () => {
        if (showImg != 'a'){
            setShowImg('a');
        }
    };
    const toggleImg2 = () => {
        if (showImg != 'b'){
            setShowImg('b');
        }
    };

    return(
        <View style={styles.aboutBody}>
            <ScreenHeader headerTitle="이용방법"/>
            <View style={styles.aboutContent}>
                <View style={[styles.checkDoner, styles.checkDonerAbout]}>
                    <View style={[styles.imgBtnJoin, styles.imgBtnJoinAbout]}>
                        <InputImgBtn
                            onPress={toggleImg1}
                            url={require("../assets/donator.png")}
                            title="기부자"/>
                        <InputImgBtn 
                            onPress={toggleImg2}
                            url={require("../assets/receiver.png")} 
                            title="수혜자"/>
                    </View>
                </View>

                <View style={styles.aboutDonate}>
                    {/* {showImg ? (
                        <Image source={require("../assets/donator.png")}
                            style={styles.img} resizeMode={'contain'} />
                    ):(
                        <Image source={require("../assets/receiver.png")}
                            style={styles.img} resizeMode={'contain'} />
                    )} */}
                    {showImg === 'a'?
                    (
                        <Image source={require("../assets/donator.png")}
                            style={styles.img} resizeMode={'contain'} />
                    ):(
                        <Image source={require("../assets/receiver.png")}
                            style={styles.img} resizeMode={'contain'} />
                    ) }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        wordBreak: 'break-all',
    },
    aboutContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '14%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    aboutDonate: {
        borderTopWidth: '1px solid',
        borderTopColor: '#dedede',
        marginTop: '1%',
        width: '96%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: 11,
        boxSizing: 'border-box',
        flexDirection: 'column',
    },
    checkDonerAbout: {
        height: '15%',
    },
    checkDoner: {
        width: '100%',
        height: '19%',
        position: 'relative',
    },
    imgBtnJoinAbout: {
        height: '96%',
        flexDirection: 'row',
    },
    imgBtnJoin: {
        color: 'rgba(95, 94, 94, 0.71)',
        display: 'flex',
        justifyContent: 'center',
        width: '60%',
        height: '73%',
        alignItems: 'center',
        marginLeft: '20%',
    },
    img: {
        width: 100,
        height: 100,
    },
});