import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Image } from 'react-native';
import { Variables } from '../components/Variables';

export default function SupportMoney({navigation}){
    const [point, setPoint] = useState();
    const [name, setName] = useState();
    const onSubmit = () => {
        // useEffect(() => {
        //     axios.post(``,
        //     {
                
        //     })
        //         .then(response => {
        //             setPost(response.data);
        //             navigation.navigate('');
        //         })
        //         .catch(error => console.log(error))
        //   }, []);
        navigation.navigate('AfterSupport');
    };

    return(
        <View style={styles.joinBody}>
            <View style={styles.joinContent}>
                <View style={styles.supportMoneyTitleView}>
                    <Image source={require("../assets/donator.png")}
                        style={styles.supportMoneyImg} resizeMode={'contain'} />
                    <Text style={styles.supportMoneyTitle}>푸드뱅크에</Text>
                    <Text style={styles.supportMoneyTitle}>후원하기</Text>
                </View>
                
                <View style={styles.inputView}>
                    <View style={styles.supportMoneyInput}>
                        <Text style={styles.inputTitle}>후원 포인트 * </Text>
                        <TextInput
                            value={point}
                            onChangeText={setPoint}
                            placeholder="후원 포인트 입력"       
                            style={styles.textForm}    
                        />
                    </View>
                    <View style={styles.supportMoneyInput}>
                        <Text style={styles.inputTitle}>기부자 닉네임 *</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="닉네임 입력(ex 어피치)"       
                            style={styles.textForm}    
                        />
                    </View>
                    <Text>푸드뱅크에 후원한다는 것은?</Text>
                </View>
                <Pressable onPress={onSubmit}
                    style={styles.supportMoneyBtnView}>
                    <Text style={styles.supportMoneyBtnText}>후원하기</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    joinBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        wordBreak: 'break-all',
    },
    joinContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    supportMoneyTitleView: {
        height: '15%',
    },
    supportMoneyImg: {
        width: 50,
        height: 50,
    },
    supportMoneyTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    inputView: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: '10%',
    },
    supportMoneyInput: {
        width: '100%',
        height: '12%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginVertical: '4%',
    },
    inputTitle: {
        marginBottom: '2%',
        fontSize: 14,
    },
    textForm: {
        borderBottomWidth: 1,
        borderBottomColor: '#d7d7d7',
        fontSize: 16,
        fontWeight: '300',
        paddingBottom: '2%',
        width: '80%',
    },
    supportMoneyBtnView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '6%',
        backgroundColor: Variables.btnColor,
        borderRadius: 5,
    },
    supportMoneyBtnText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});