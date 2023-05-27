import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ipAddress } from '../ipAddress';
import axios from 'axios';
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

export const CommentBottomSheet = (props, {}) => {
    const {
        modalVisible,
        setModalVisible,
        postId,
    } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
        })
    }

    const [postConetent, setPostContent] = useState([]);
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/post/${postId}`)
            .then(response => setPostContent(response.data))
            .catch(error => console.log(error))
      }, []);

    useEffect(() => {
        axios.get(`http://${ipAddress}:8080/comment/post/${postId}`)
            .then(response => setCommentList(response.data))
            .catch(error => console.log(error))
    }, []);


    const Content = () => {
        return (
        <View style={styles.csSecondPageContent}>
            <ScrollView>
                <View style={styles.boardListView}>
                    <View style={styles.postTitleView}>
                        <Text style={styles.postText}>Q. {postConetent.title}</Text>
                        <Text style={styles.greyText}>전국푸드뱅크</Text>
                    </View>
                    
                    <View>
                        <Text style={styles.greyText}>내용</Text>
                        <Text style={styles.postText}>{postConetent.content}</Text>
                    </View>
                </View>

                <View style={styles.commentContainer}>
                {commentList && commentList.length > 0 ? (
                    commentList.map((comment) => (
                    <View style={{ flexDirection: 'row' }} key={comment.id}>
                        <Image
                        source={require('../assets/manager.png')}
                        style={styles.img}
                        resizeMode='contain'
                        />
                        <LinearGradient
                        colors={['#d7eeff', '#ffffff']}
                        style={styles.commentView}
                        >
                        <Text style={styles.commentText}>{comment.content}</Text>
                        </LinearGradient>
                    </View>
                    ))
                ) : (
                    <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={require('../assets/manager.png')}
                        style={styles.img}
                        resizeMode='contain'
                    />
                    <LinearGradient
                        colors={['#d7eeff', '#ffffff']}
                        style={styles.commentView}
                    >
                        <Text style={styles.commentText}>답변을 기다려주세요</Text>
                    </LinearGradient>
                    </View>
                )}
                </View>
            </ScrollView>
        </View>
    )};

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={styles.background}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    <Content />
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: 400,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    csSecondPageContent: {
        width: '85%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    boardListView: {
        justifyContent: 'center',
        height: '90%',
        marginTop: '3%',
    },
    postTitleView: {
        width: '100%',
        height: '25%',
        marginBottom: '8%',
    },
    postText: {
        fontWeight: 500,
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: 0.055,
        color: '#050505',
    },
    greyText: {
        fontWeight: 400,
        fontSize: 15,
        lineHeight: 22,
        color: 'rgba(35, 35, 35, 0.6)',
    },
    img: {
        width: 100,
        height: 100,
    },
    commentContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    commentView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '70%',
        height: '60%',
        padding: 10,
        borderRadius: 8,
    },
    commentText: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0.055,
    },
})
