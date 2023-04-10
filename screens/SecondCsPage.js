import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import BasicBtn from "../components/BasicBtn";

export default function SecondCsPage({ navigation }) {
  return (
    <View style={styles.joinBody}>
        {/* <ScreenHeader /> */}
        <View style={styles.csSecondPageContent}>
            <View>
                <BasicBtn style={styles.whiteText} title="최신순" />
                <BasicBtn title="글쓰기" />
            </View>
            <View style={styles.csBoardList}>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    joinBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
        position: '',
    },
    csSecondPageContent: {
        width: '100%',
        height: '100%',
    },
    csBoardList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    whiteText: {
        color: 'white',
    }
});