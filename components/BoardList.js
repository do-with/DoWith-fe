import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export const BoardList = ({onPress, onClickList, url, title, name, createdAt, answerYn}) => {
    return(
        <Pressable
            onPress={()=>onClickList()}
            style={(pressed) => [
                styles.csBoardList, 
                styles.csBoardListBtn
        ]}>
            <View style={styles.boardListTitle}>
                <Text>Q. {title}</Text>
                <Text>{createdAt}</Text>
            </View>
            <View style={styles.boardListSubTitle}>
                <Text>{name}</Text>
            </View>
            <View>
                <Text>{answerYn}</Text>
            </View>
        </Pressable>
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