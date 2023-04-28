import { StyleSheet, View, Button, Image, TouchableOpacity, Text, Pressable, Dimensions } from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import Banner from '../components/Banner';
import { LinearGradient } from 'expo-linear-gradient';
import { Variables } from "../components/Variables";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MainScreen({ navigation }) {
  return (
    <View style={styles.mainBody}>
        <ScreenHeader />
        <View style={styles.mainContent}>
            <View style={styles.content}>
                <View style={styles.contentCategory}>
                    <TouchableOpacity style={styles.transImgBtn}
                        onPress={() => navigation.navigate("NearByStore")}>
                        <Image source={require("../assets/store.png")}
                            style={styles.img} resizeMode={"contain"}/>
                        <Text>가까운 매장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.transImgBtn}>
                        <Image source={require("../assets/notice.png")}
                            onPress={() => navigation.navigate("Announce1")}
                            style={styles.img} resizeMode={"contain"}/>
                        <Text>알림 마당</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.transImgBtn}>
                        <Image source={require("../assets/donateSitu.png")}
                                style={styles.img} resizeMode={"contain"}/>
                        <Text>기부 현황</Text> 
                    </TouchableOpacity>
                </View>
                <View style={styles.contentCategory}>
                    <TouchableOpacity style={styles.transImgBtn}>
                        <Image source={require("../assets/menual.png")}
                            onPress={() => navigation.navigate("AboutScreen")}
                            style={styles.img} resizeMode={"contain"}/>
                        <Text>이용 방법</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.transImgBtn}
                        onPress={() => navigation.navigate("FirstCsPage")}>
                        <Image source={require("../assets/ask.png")}
                                style={styles.img} resizeMode={"contain"}/>
                        <Text>문의하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.transImgBtn}>
                        <Image source={require("../assets/burger.png")}
                                style={styles.img} resizeMode={"contain"}/>
                        <Text>지역 거래</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentMine}>
                <View style={styles.contentMineHistoryBtn}>
                    <Text>마음이 1회 전달됐어요.</Text>
                    <TouchableOpacity style={styles.blue}
                        href="">
                        <Text style={{color: 'white'}}>나의 목록 보러가기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentBtn}>
                    <LinearGradient colors={['#2992be','#2A93BF', '#3b5998']}
                        style={[styles.blue, styles.basicBtnContentMine]}>
                        <Pressable
                            onPress={() => navigation.navigate("DonateScreen")}>
                            <Text style={{color: 'white'}}>간편하게 기부하기</Text>
                        </Pressable>
                    </LinearGradient>
                    
                    <Pressable style={styles.basicBtnContentMine}
                        onclick="">
                        <Text>나의 혜택보기</Text>
                    </Pressable>
                </View> 
            </View>
            
            <Banner>
                {/* <div class="single-item">
                    <a href=""> 1 </a>
                    <a href=""> 2 </a>
                    <a href=""> 3 </a>
                  </div> */}
            </Banner>

        </View>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
    transImgBtn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        height: '35%',
    },
    img: {
        width: windowWidth * 0.12,
        height: windowHeight * 0.06,

    },
    mainContent: {
        height: '95%',
        width: '100%',
        top: '12%',
        position: 'relative',
        backgroundColor: Variables.mainColor,
    },
    mainBody: {
        color: 'transparent',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems:'center',
        height: '33%',
        position: 'relative',
        backgroundColor: 'white',
    },
    contentCategory: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        alignItems:'center',
        height: '32%',
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        boxShadow: '1px 2px 4px rgba(70, 70, 70, 0.2)',
        borderRadius: 15,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    contentMine: {
        position: 'relative',
        width: '100%',
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    
    },
    contentMineHistoryBtn: {
        // fontFamily: 'Noto Sans KR',
        display: 'flex',
        flexDirection: 'column',
        width: '42%',
        height: '66%',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#B6B6B6',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.33,
        shadowRadius: 3,
        elevation: 3,
    },
    basicBtnContentMine: {
        display: 'flex',
        flexDirection: 'column',
        height: '35%',
        width: '100%',
        justifyContent: 'center',
        color: 'rgba(0, 0, 0, 0.63)',
        border: 'none',
        boxShadow: '1px 2px 2px 1px rgba(182, 182, 182, 0.179)',
        borderRadius: '8px',
        backgroundColor: 'white',
        fontSize: '16px',
        fontWeight: 700,
        alignItems: 'center',
        // letterSpacing: '2px',
    },
    blue: {
        backgroundColor: Variables.btnColor,
    },
    contentBtn: {
        width: '40%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});