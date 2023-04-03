import { StyleSheet, View, Button, Image, TouchableOpacity, Text } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import TransImgBtn from "../components/TransImgBtn";
// style={styles.}
function MainScreen({ navigation }) {
  return (
    <View style={styles.mainBody}>
        <ScreenHeader></ScreenHeader>
        <View style={styles.mainContent}>
            <View style={styles.contentCategory}>
                <TransImgBtn>
                    <TouchableOpacity href="">
                        <Image src="../assets/store.png" />
                        <Text>가까운 매장</Text>
                    </TouchableOpacity>
                </TransImgBtn>
                <TransImgBtn>
                    <TouchableOpacity href="">
                        <Image src="../assets/store.png" />
                        <Text>알림 마당</Text>
                    </TouchableOpacity>
                </TransImgBtn>
                <TransImgBtn>
                    <TouchableOpacity href="">
                        <Image src="../assets/store.png" />
                        <Text>가까운 매장</Text>
                    </TouchableOpacity>
                </TransImgBtn>
            </View>
        </View>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
    mainContent: {
        height: '90vh',
        width: '100%',
        top: '5em',
        position: 'relative',
    },
    mainBody: {
        color: 'transparent',
    },
    contentCategory: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '32%',
        backgroundColor: 'white',
        position: 'relative',
    },
    contentMine: {
        position: 'relative',
        width: '100%',
        height: '29%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    
    },
});