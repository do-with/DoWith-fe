import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export const BoardList = ({}) => {
    return(
        <View style={[styles.csBoardList, styles.csBoardListBtn]}>
            {/* 질문 글 개수만큼 Pressable 있어야 함 */}
            <Pressable onPress={()=>navigation.push()}>
                <View style={styles.boardListTitle}>
                    <Text>질문 글 제목</Text>
                    <Text>날짜</Text>
                </View>
                <View style={styles.boardListSubTitle}>
                    <Text>이름</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    csBoardList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    csBoardListBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 103,
        // width: '90%',
        width: '93%',
        marginBottom: '2%',
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 8,
        shadowColor: '#707070',
        shadowOffset: {
            width: 1.5,
            height: 1.5,
        },
        shadowOpacity: 0.23,
        shadowRadius: 0,
        elevation: 1,
    },
    boardListTitle: {
        width: '100%',
        height: '28%',
        display: 'flex',
        marginTop: '2%',
        flexDirection: 'column',
    },
    boardListSubTitle: {
        width: '100%',
        height: '28%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
});