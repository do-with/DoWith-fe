// CustomInput.js
import { StyleSheet, TextInput } from 'react-native';
import { Variables } from './Variables';
// 1. CustomInput component 만들기
export const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
	return (
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}    
            secureTextEntry={secureTextEntry}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFFFFF',
        width: '83%',
        height: '25%',
        paddingLeft: 15,
        borderRadius: 5,
        borderWidth:2,
        borderColor: '#ddd',
        marginBottom: 18,
        alignSelf: 'center',
    },
})
