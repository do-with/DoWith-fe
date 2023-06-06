import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../contexts/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export default function DonateScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); // 대분류
  const [items, setItems] = useState([
    { label: "제과류", value: 1 },
    { label: "즉석식품", value: 2 },
    { label: "냉동식품", value: 3 },
    { label: "통조림", value: 4 },
    { label: "장류", value: 5 },
    { label: "소스류", value: 6 },
    { label: "기름류", value: 7 },
    { label: "음료류", value: 8 },
    { label: "육가공류", value: 9 },
    { label: "농산물", value: 10 },
    { label: "제빵류", value: 11 },
    { label: "세제류", value: 12 },
    { label: "휴지류", value: 13 },
    { label: "수건류", value: 14 },
    { label: "기저귀류", value: 15 },
    { label: "신체/위생용품류", value: 16 },
    { label: "여성/위생용품류", value: 17 },
    { label: "청소/환경 위생용품류", value: 18 },
  ]);

  const { user } = useContext(AuthContext);

  const [imageUris, setImageUris] = useState([]);
  const [itemTitle, setItemTitle] = useState(""); // 대표 물품명
  const [amount, setAmount] = useState(null); // 수량
  const [donatorName, setDonatorName] = useState(""); // 기부자명
  const githubURLs = [];

  const handleAmountChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");

    setAmount(cleanedText);
  };

  const createFile = async (imageUris) => {
    console.log("createFile 함수 실행");
    const token = "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";
    const repository = "whgus613/jinji";
    const commitMessage = "upload image";

    try {
      for (let i = 0; i < imageUris.length; i++) {
        const imageUri = imageUris[i];
        const fileInfo = await FileSystem.getInfoAsync(imageUri.uri);
        const currentTime = new Date()
          .toISOString()
          .replace(/:/g, "-")
          .replace(/\s+/g, "");
        const fileContent = await FileSystem.readAsStringAsync(fileInfo.uri, {
          encoding: "base64",
        });

        const filePath = `path/to/file${currentTime}-${i + 1}.jpg`;
        const url = `https://api.github.com/repos/${repository}/contents/${filePath}`;
        const headers = {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        };

        try {
          const response = await axios.put(
            url,
            {
              message: commitMessage,
              content: fileContent,
            },
            { headers }
          );

          if (response.status === 201) {
            console.log("File created:", response.data);
            const downloadUrl = response.data.content.html_url + "?raw=true";
            githubURLs.push(downloadUrl);
          } else {
            console.error("Failed to create file:", response);
          }
        } catch (error) {
          console.error("An error occurred:", error.response.data);
        }
      }

      // 업로드된 이미지 파일의 다운로드 URL 활용 또는 필요한 작업 수행
      console.log("GitHub URLs:", githubURLs);
    } catch (error) {
      console.error("An error occurred:", error.response.data);
    }
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      maxCount: 1, // 최대 1개의 이미지 선택
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImageUris = [...imageUris]; // 기존 이미지 유지
      const selectedImages = result.assets.slice(0, 1); // 최대 1개의 이미지만 선택
      const additionalImageUris = selectedImages.map((image) => ({
        uri: image.uri,
      }));
      newImageUris.push(...additionalImageUris); // 추가 이미지를 기존 이미지 배열에 추가

      if (newImageUris.length > 1) {
        // 이미지가 2개를 초과한 경우
        Alert.alert("이미지는 한 장만 업로드할 수 있습니다.");
        return;
      }

      setImageUris(newImageUris);
      //   console.log(imageUris);
    }
  };

  const removeImage = (index) => {
    const updatedImageUris = [...imageUris];
    updatedImageUris.splice(index, 1);
    setImageUris(updatedImageUris);
    // console.log(imageUris);
  };

  const onRegister = async () => {
    if (imageUris.length === 0) {
      Alert.alert("물품 이미지를 업로드해주세요");
    } else if (value === null) {
      Alert.alert("물품 분류를 선택해주세요");
    } else if (itemTitle === "") {
      Alert.alert("물품명을 입력해주세요");
    } else if (amount === null) {
      Alert.alert("물품 수량을 선택해주세요");
    } else if (donatorName === null) {
      Alert.alert("기부자명을 입력해주세요");
    } else if (
      imageUris.length === 1 &&
      value &&
      itemTitle &&
      amount &&
      donatorName
    )
      try {
        await createFile(imageUris);

        navigation.navigate("DonateScreen2", {
          category: value,
          itemTitle: itemTitle,
          amount: amount,
          donatorName: donatorName,
          image: githubURLs[0],
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View style={styles.registerBody}>
        <ScreenHeader headerTitle="기부하기" />
        <View style={styles.registerContent}>
          <KeyboardAwareScrollView contentContainerStyle={{ height: "85%" }}>
            <Text style={styles.personalizeText}>
              {user.name} 님 마음 전달 중 ...♥
            </Text>
            <View style={styles.registerBox}>
              <View style={styles.registerDonate1}>
                <Text style={styles.localTradeTitle}>기부 물품 등록하기</Text>
                <View
                  style={{
                    flexDirection: "row",
                    height: "16.3%",
                  }}
                >
                  <Pressable
                    onPress={selectImage}
                    style={styles.selectImageBtn}
                  >
                    <Ionicons name="camera-outline" size={33} color="white" />
                  </Pressable>
                  {imageUris.map((uri, index) => (
                    <View key={index} style={styles.selectedImageContainer}>
                      <Image
                        source={{ uri: uri.uri }}
                        style={styles.selectedImage}
                        resizeMode="contain"
                      />
                      <Pressable
                        onPress={() => removeImage(index)}
                        style={styles.removeImageBtn}
                      >
                        <Ionicons
                          name="close-circle-outline"
                          size={24}
                          color="grey"
                        />
                      </Pressable>
                    </View>
                  ))}
                </View>
                <Text style={{ color: "grey", fontSize: 13, marginTop: "-3%" }}>
                  물품의 전체적인 모습을 찍어주세요.{"\n"}유통기한이 30일 이상
                  남은 물품만 기부 가능합니다.
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text>물품 분류 선택 </Text>
                  <Text style={{ color: "#FF1919" }}>*</Text>
                </View>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="물품 분류를 선택해주세요"
                  listMode="MODAL"
                  modalProps={{
                    animationType: "fade",
                  }}
                  modalTitle="물품 분류 선택"
                  style={styles.picker}
                  placeholderStyle={{
                    color: "#CACACA",
                  }}
                />
                <View style={{ flexDirection: "row" }}>
                  <Text>물품명 </Text>
                  <Text style={{ color: "#FF1919" }}>*</Text>
                </View>
                <TextInput
                  value={itemTitle}
                  onChangeText={setItemTitle}
                  placeholder="물품명을 입력해주세요"
                  style={styles.inputText}
                />
                <View style={{ flexDirection: "row" }}>
                  <Text>수량 </Text>
                  <Text style={{ color: "#FF1919" }}>*</Text>
                </View>
                <TextInput
                  value={amount}
                  onChangeText={handleAmountChange}
                  placeholder="총 수량을 입력해주세요"
                  style={styles.inputText}
                  keyboardType="numeric"
                />
                <View style={{ flexDirection: "row" }}>
                  <Text>기부자명 </Text>
                  <Text style={{ color: "#FF1919" }}>*</Text>
                </View>
                <TextInput
                  value={donatorName}
                  onChangeText={setDonatorName}
                  placeholder="기부자 닉네임을 입력해주세요"
                  style={styles.inputText}
                />
              </View>
            </View>
            <LinearGradient
              colors={["#3b5998", "#3b5998", "#003C7C"]}
              style={styles.registerBtn}
            >
              <Pressable onPress={onRegister} style={styles.registerBtn1}>
                <Text style={styles.registerBtnText}>다음</Text>
              </Pressable>
            </LinearGradient>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  registerBody: {
    width: "100%",
    height: "100%",
    backgroundColor: Variables.mainColor,
    flexWrap: "wrap",
    alignContent: "center",
  },
  registerContent: {
    width: "100%",
    position: "relative",
    top: "15%",
  },
  personalizeText: {
    letterSpacing: 1,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 23,
    color: "#2D4C89",
    marginLeft: "8%",
    marginBottom: "2%",
  },
  registerBox: {
    alignItems: "center",
  },
  registerDonate1: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#8B8B8B",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.16,
    borderRadius: 8,
    width: "91%",
    height: "96%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: "3%",
    boxSizing: "border-box",
    paddingHorizontal: "7%",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingVertical: "3%",
    paddingBottom: "7%",
  },
  inputText: {
    width: "100%",
    height: "5%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderBottomWidth: 0.5,
  },
  registerBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxSizing: "border-box",
    backgroundBlendMode: "soft-light, normal",
    shadowColor: "rgba(166, 171, 189, 0.8)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 5,
    color: "white",
    width: "25%",
    height: "8%",
    left: "70%",
    marginTop: "2%",
  },
  registerBtn1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxSizing: "border-box",
    backgroundBlendMode: "soft-light, normal",
    shadowColor: "rgba(166, 171, 189, 0.8)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 5,
    color: "white",
    width: "100%",
    height: "100%",
  },
  registerBtnText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#fff",
  },
  localTradeTitle: {
    marginVertical: "2%",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 21,
  },
  selectImageBtn: {
    backgroundColor: "#ddd",
    width: "30%",
    marginRight: "3%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImage: {
    width: 93,
    height: 93,
  },
  removeImageBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  picker: {
    minHeight: "5%",
    marginBottom: "2%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: "-5%",
  },
});
