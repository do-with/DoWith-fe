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
                    <TouchableOpacity style={styles.transImgBtn}
                        onPress={() => navigation.navigate("SupportMoney")}>
                        <Image source={require("../assets/burger.png")}
                                style={styles.img} resizeMode={"contain"}/>
                        <Text>후원하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentMine}>
                <LinearGradient colors={['#2992be','#2A93BF', '#3b5998']}
                        style={styles.localTradeBtn}>
                    <Pressable onPress={() => navigation.navigate('')}>
                        <Text style={styles.localTradeBtnText}>우리 동네</Text>
                        <Text style={styles.localTradeBtnText}>기부 거래</Text>
                    </Pressable>
                </LinearGradient>

                <Pressable style={styles.donationBtn}
                    onPress={() => navigation.navigate('')}>
                    <Text style={styles.donationBtnText}>5분 만에</Text>
                    <Text style={styles.donationBtnText}>기부 접수</Text>
                </Pressable>
            </View>
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
    donationBtn: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        height: '60%',
        boxSizing: 'border-box',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#B6B6B6',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        backgroundColor: '#fff',
        shadowOpacity: 0.33,
        shadowRadius: 3,
        elevation: 3,
    },
    localTradeBtn: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        height: '60%',
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
    localTradeBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    donationBtnText: {
        fontWeight: 'bold',
        fontSize: 20,
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