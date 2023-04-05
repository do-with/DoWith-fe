import { StyleSheet, View, TextInput} from "react-native";
import ScreenHeader from "../components/ScreenHeader";

function DonateScreen({ navigation }) {
  return (
    <View style={styles.joinBody}>
        <ScreenHeader />
        <View style={styles.joinContent}>
            <TextInput placeholder="useless placeholder" />
        </View>
    </View>
  );
}

export default DonateScreen;

const styles = StyleSheet.create({
    joinBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    joinContent: {
        width: '100%',
        height: '84%',
        position: 'absolute',
        top: '16%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});