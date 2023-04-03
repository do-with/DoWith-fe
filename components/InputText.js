import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
// import {vw, vh} from 'react-native-viewport-units';

export default function InputText(){
    return(
        <View style={styles.inputText}>
            <Text>이름 *</Text>
            <TextInput type="text" name="name" id="name" value="이름 입력(ex 홍길동)"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputText: {
        width: '100%',
        height: '12%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        /* justify-content: center; */
        flexDirection: 'column',
    },
});
// .input-text{
//     width: 100%;
//     height: 12%;
//     position: relative;
//     display: flex;
//     align-items: center;
//     /* justify-content: center; */
//     flex-direction: column;
// }
// .input-text > span{
//     width: 100%;
//     height: 22%;
//     box-sizing: border-box;
//     position: relative;
//     padding-left: 8%;
//     padding-top: 1%;
//     font-family: 'Inter';
//     font-weight: 400;
//     font-size: 14px;
//     line-height: 17px;
//     color: black;
// }
// span > small{
//     color: red;
// }

// .input-text > input{
//     width: 86%;
//     height: 57%;
//     box-sizing: border-box;
//     position: relative;
//     padding-left: 1%;
//     padding-top: 3%;
//     font-family: 'Inter';
//     font-weight: 400;
//     font-size: 16px;
//     line-height: 17px;
//     color:  #ABABAB;
//     border-right: 0px;
//     border-left: 0px;
//     border-top: 0px;
//     border-bottom: 1px solid gray;
// }
