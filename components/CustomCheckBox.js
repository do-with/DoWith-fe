import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CustomCheckBox = ({ value, onValueChange, text }) => {
  const [isChecked, setIsChecked] = useState(value);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onValueChange && onValueChange(!isChecked);
  };

  return (
    <Pressable onPress={toggleCheckbox}
        style={styles.checkBox}>
        {isChecked?
        (<Ionicons name="checkmark-circle-outline" size={28} color="#ba3e3e" style={styles.icon} />):
        (<Ionicons name="checkmark-circle-outline" size={28} color="#d7d7d7" style={styles.icon} />)}
        <Text styles={styles.checkText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    checkBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight:'1%',
    },
    checkText: {
        fontWeight: 350,
        fontSize: 13,
        lineHeight: 19,
        color: '#5A5A5A',
    },
});
