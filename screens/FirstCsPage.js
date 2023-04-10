import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { TransImgBtn } from "../components/TransImgBtn";
import { Variables } from "../components/Variables";

function FirstCsPage({ navigation }) {
  return (
    <View style={styles.csFirstPageBody}>
        <ScreenHeader />
        <View style={styles.csFirstPageContent}>
            <View style={styles.csCall}>
                <Text style={styles.h3}>전화 연결</Text>
                <View style={styles.csCallView}>
                    <View style={styles.csCallBtn}>
                        <TransImgBtn 
                            onPress={()=>navigation.navigate("NearByStore")}
                            url={require("../assets/mass-donation.png")}
                            title="대량 기부"
                            subtitle="약 5000kg 이상" 
                        />
                    </View>
                    <View style={styles.csCallBtn}>
                        <TransImgBtn 
                            onPress={()=>navigation.navigate("NearByStore")}
                            url={require("../assets/small-donation.png")}
                            title="소량 기부"
                            subtitle="가까운 푸드뱅크 연결" 
                        />
                    </View>
                </View>
            </View>
                
            <View style={styles.csBoards}>
                <View style={styles.csBoardsBtn}>
                    <TransImgBtn 
                        onPress={()=>navigation.navigate("NearByStore")}
                        url={require("../assets/donator-cs.png")}
                        title="기부자 문의"
                        subtitle="기부하는 것에 대한 질문이 있으신가요?" 
                    />
                </View>
                <View style={styles.csBoardsBtn}>
                    <TransImgBtn 
                        onPress={()=>navigation.navigate("NearByStore")}
                        url={require("../assets/donation-request-cs.png")}
                        title="기부 요청 문의"
                        subtitle="기부 요청을 하려고 하시나요?" 
                    />
                </View>
                <View style={styles.csBoardsBtn}>
                    <TransImgBtn 
                        onPress={()=>navigation.navigate("NearByStore")}
                        url={require("../assets/other-cs.png")}
                        title="기타 문의"
                        subtitle="좋은 의견이나, 개선하고 싶은 것이 있으신가요?"
                    />
                </View>
            </View>
        </View>
    </View>
  );
}

export default FirstCsPage;

const styles = StyleSheet.create({
    csFirstPageBody: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Variables.mainColor,
    },
    csFirstPageContent: {
        height: '90%',
        width: '95%',
        top: '18%',
        position: 'relative',
    },
    csCallView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '80%',
        marginBottom: '15%',
    },
    csCall: {
        width: '100%',
        height: '23%',
        justifyContent: 'space-around',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        /* background: rgba(255, 255, 255, 0.55); */
        /* box-shadow: 1px 2px 4px rgba(70, 70, 70, 0.2); */
    },
    csCallBtn: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(133, 133, 133, 0.09)',
        boxShadow: '2px 2px 1px rgba(116, 116, 116, 0.03)',
        borderRadius: 10,
        width: '42%',
        height: '100%',
        marginHorizontal: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h3: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Variables.btnColor,
        marginLeft: '4%',
        marginBottom: '20%',
    },
    csBoards: {
        width: '100%',
        height: '100%',
        display: 'flex',
        top: '5%',
        alignItems: 'center',
    },
    csBoardsBtn: {
        width: '88%',
        marginVertical: 8,
        height: '15%',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(133, 133, 133, 0.09)',
        boxShadow: '2px 2px 1px rgba(116, 116, 116, 0.03)',
        borderRadius: 10,
        
    },
});