import React from 'react';
import { StyleSheet, View } from 'react-native';
// import {vw, vh} from 'react-native-viewport-units';

export default function TransImgBtn(){
    return(
        <View style={styles.transImgBtn}>
        </View>
    );
};

const styles = StyleSheet.create({
    transImgBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        height: '99%',
        marginLeft: '5px',
    }
});

// .trans_img-btn > a{
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100%;
// }

// .trans_img-btn > a > img{
//     width: 44%;
//     height: 60%;
    
// }
// .content-category >div > .trans_img-btn > a > img{
//     animation: inOut 8s ease-in-out infinite;
// }

// .trans_img-btn > a > span{
//     font-family: 'Noto Sans KR';
//     margin-top: 8px;
//     font-size: 11pt;
//     font-weight: 700;
// }

// .trans_img-btn-sm > span{
//     font-size: 10pt;
//     margin-top: 3px;
// }

// @keyframes inOut {
//     0%{
//         transform: rotateY(0);
//     }
//     50%{
//         transform: rotateY(0) translateY(2px);
//     }
//     100%{
//         transform: rotateY(0);
//     }
    
// }

// @media (min-width: 720px){
//     .trans_img-btn > a > span{
//         margin-top: 10px;
//         font-size: 18pt;
//         font-weight: 700;
//     }
//     @keyframes inOut {
//         0%{
//             transform: rotateY(0);
//         }
//         50%{
//             transform: rotateY(0) translateY(2px);
//         }
//         100%{
//             transform: rotateY(0);
//         }
        
//     }
    
// }

// @media (min-width: 850px){
//     .trans_img-btn-sm > span {
//         font-size: 20pt;
//         margin-top: 4px;
//     }
// }