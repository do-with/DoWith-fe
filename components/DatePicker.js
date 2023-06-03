import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ onDateChange }) => {
  const defaultDate = new Date(2000, 0, 1); // 기본 날짜 값 설정
  const [date, setDate] = useState(defaultDate);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    showDatePicker(); // 화면에 진입하자마자 DatePicker를 열기 위해 useEffect 사용
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    setDate(selectedDate || date);
    onDateChange(selectedDate || date);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={{ width: "31%" }}
        />
      )}
    </View>
  );
};

export default DatePicker;
