import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Pressable, TextInput } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { InputImgBtn } from '../components/InputImgBtn';
import { Variables } from '../components/Variables';

// 유효성 검사 필요
// 휴대전화 인증 필요
export default function Join1({navigation}){
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [userType, setUserType] = useState(null);

    const [donatorSelected, setDonatorSelected] = useState(false);
    const [receiverSelected, setReceiverSelected] = useState(false);

    const handleUserType = (type) => {
        setUserType(type);
        if (type === '기부자') {
            setDonatorSelected(true);
            setReceiverSelected(false);
        } else {
            setDonatorSelected(false);
            setReceiverSelected(true);
        }
    };
    
    const clickJoin = () => {
        if (name && phone && email && password && checkPassword && userType && password === checkPassword) {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('phone', phone);
          formData.append('email', email);
          formData.append('password', password);
    
          fetch(`https://${ipAddress}:8080/user`, {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              navigation.navigate('LoginScreen');
            })
            .catch(error => {
              console.error(error);
            });
        }
      };

    return(
        <View style={styles.joinBody}>
            <ScreenHeader headerTitle="회원가입"/>
            <View style={styles.joinContent}>
                <ScrollView style={{height: '100%'}}>
                    <View style={styles.chooseType}>
                        <View>
                            <Text style={styles.inputTitle}>* 선택해주세요</Text>
                        </View>
                        <View style={{marginTop: '2%', flexDirection:'row', justifyContent: 'space-around'}}>
                            <InputImgBtn
                                url={require("../assets/donator.png")}
                                title="기부자"
                                onPress={() => handleUserType('기부자')}
                                selected={donatorSelected}/>
                            <InputImgBtn
                                url={require("../assets/receiver.png")}
                                title="수혜자" 
                                onPress={() => handleUserType('수혜자')}
                                selected={receiverSelected}/>
                        </View>
                    </View>

                    <View style={styles.inputInfo}>
                        <View style={styles.inputText}>
                            <Text style={styles.inputTitle}>이름 *</Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="이름 입력(ex 홍길동)"       
                                style={styles.textForm}    
                            />
                        </View>

                        <View style={styles.inputText}>
                            <Text style={styles.inputTitle}>휴대전화 *</Text>
                            <TextInput
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="휴대전화 입력"       
                                style={styles.phoneForm}
                            />   
                        </View>

                        <View style={styles.inputText}>
                            <Text style={styles.inputTitle}>아이디 *</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="이메일 입력"       
                                style={styles.textForm}
                            />
                        </View>

                        <View style={styles.inputText}>
                            <Text style={styles.inputTitle}>비밀번호 *</Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="비밀번호 입력"       
                                style={styles.textForm}
                            />
                        </View>

                        <View style={styles.inputText}>
                            <Text style={styles.inputTitle}>비밀번호 확인 *</Text>
                            <TextInput
                                value={checkPassword}
                                onChangeText={setCheckPassword}
                                placeholder="비밀번호 확인"       
                                style={styles.textForm}
                            />
                        </View>
                        
                        <Text>기부에 필요한 정보를 수집합니다.</Text>
                        
                    </View>
                    
                    <Pressable style={styles.joinBtn}
                        onPress={clickJoin}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>가입하기</Text>
                    </Pressable>
                </ScrollView>
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
        top: '14%',
    },
    chooseType: {
        width: '100%',
        height: '19%',
        position: 'relative',
    },
    inputInfo: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    inputText: {
        width: '100%',
        height: '12%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        marginVertical: '4%',

    },
    inputTitle: {
        marginBottom: '3%',
        fontSize: 14,
    },
    textForm:{
        borderBottomWidth: 1,
        borderBottomColor: '#d7d7d7',
        fontSize: 16,
        fontWeight: '300',
        paddingBottom: '2%',
    },
    phoneForm:{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        // fontFamily: 'Noto Sans KR',
        fontSize: 16,
        fontWeight: '300',
        borderBottomWidth: 1,
        borderBottomColor: '#d7d7d7',
        paddingBottom: '2%',
    },
    joinBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '9%',
        backgroundColor: Variables.btnColor,
        borderRadius: 5,
    },
});