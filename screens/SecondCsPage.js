import { StyleSheet, View, ScrollView, Text} from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import BtnSm from "../components/BtnSm";
import { BoardList } from "../components/BoardList";

function SecondCsPage({ navigation, route }) {
  return (
    <View style={styles.joinBody}>
        <ScreenHeader />
        <View style={styles.csSecondPageContent}>
            <ScrollView>
                <View style={styles.btnSmView}>
                    <BtnSm primary title="최신순" color="white"/>
                    <BtnSm title="글쓰기" />
                </View>

                <View style={styles.boardListView}>
                    {/* <BoardList /> 컴포넌트 사용 */}
                    <Text>id: {route.params.id}</Text>
                    <BoardList />
                </View>
            </ScrollView>
        </View>
    </View>
  );
}

export default SecondCsPage;

const styles = StyleSheet.create({
    joinBody: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    csSecondPageContent: {
        width: '100%',
        height: '100%',
        top: '15%',
    },
    btnSmView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    csBoardList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    white: {
        backgroundColor: 'rgb(255 255 255 / 76%)',
        color: 'black',
    },
    boardListView: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});