import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { ScreenHeader } from "../components/ScreenHeader";
import { Variables } from "../components/Variables";
import { ipAddress } from "../ipAddress";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../contexts/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterLocalTrade({ navigation }) {
  const [imageUris, setImageUris] = useState([]);
  const [selectedClassify, setSelectedClassify] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [content, setContent] = useState("");
  const githubURLs = [];

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

  useEffect(() => {
    console.log(imageUris);
  }, [imageUris]);

  const { user } = useContext(AuthContext);
  const user_id = user.id;

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
      maxCount: 2, // 최대 2개의 이미지 선택
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImageUris = [...imageUris]; // 기존 이미지 유지
      const selectedImages = result.assets.slice(0, 2); // 최대 2개의 이미지만 선택
      const additionalImageUris = selectedImages.map((image) => ({
        uri: image.uri,
      }));
      newImageUris.push(...additionalImageUris); // 추가 이미지를 기존 이미지 배열에 추가
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

  //   const onRegister = async () => {

  //     await createFile(imageUris);

  //     const user_id = 1;
  //     const data = {
  //         name : title,
  //         price : price,
  //         describe : content,
  //         sold_yn : false,
  //         image1GitHubURL : githubURLs[0],
  //         image2GitHubURL : githubURLs[1]
  //     }
  //     axios
  //       .post(`http://${ipAddress}:8080/local-trade/user/${user_id}/create`, data)
  //       .then((response) => {
  //         // console.log(response);
  //         navigation.navigate("MainScreen");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  const handlePriceChange = (text) => {
    // 숫자 이외의 문자 제거
    const cleanedText = text.replace(/[^0-9]/g, "");

    setPrice(cleanedText);
  };

  const onRegister = async () => {
    try {
      await createFile(imageUris);

      const data = {
        name: title,
        price: price,
        describe: content,
        sold_yn: false,
        image1GitHubURL: githubURLs[0] || null,
        image2GitHubURL: githubURLs[1] || null,
      };

      axios
        .post(
          `http://${ipAddress}:8080/local-trade/user/${user_id}/create`,
          data
        )
        .then((response) => {
          // console.log(response);
          navigation.navigate("LocalTrade");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View style={styles.joinBody}>
        <ScreenHeader headerTitle="기부 거래" />

        <View style={styles.writePostContent}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ width: "100%", height: "100%" }}
          >
            <Text style={styles.localTradeTitle}>기부상품 등록하기</Text>
            <View style={styles.selectedImagesView}>
              <Pressable onPress={selectImage} style={styles.selectImageBtn}>
                <Ionicons name="camera-outline" size={33} color="white" />
              </Pressable>
              <View style={styles.selectedImagesContainer}>
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
                      <Ionicons name="close-circle" size={24} color="#fff" />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.inputTextView}>
              <View style={{ height: "10%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.inputTitle}>분류 </Text>
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
                  style={{
                    borderWidth: 0.5,
                    minHeight: "20%",
                  }}
                />
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.inputTitle}>상품명 </Text>
                  <Text style={{ color: "#FF1919" }}>*</Text>
                </View>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="제목을 입력해주세요"
                  style={styles.input}
                />
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.inputTitle}>가격 </Text>
                  <Text style={{ color: "#FF1919" }}>*</Text>
                </View>
                <TextInput
                  value={price}
                  onChangeText={handlePriceChange}
                  placeholder="가격을 설정해주세요"
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.inputTitle}>상품 설명 </Text>
                  <Text style={{ color: "#FF1919" }}>*</Text>
                </View>
                <TextInput
                  value={content}
                  onChangeText={setContent}
                  placeholder="상품 설명을 적어주세요"
                  style={[styles.detailInput]}
                  multiline={true}
                />
              </View>
              <LinearGradient
                colors={["#4A6BAC", "#1B3974"]}
                style={styles.submitBtn}
              >
                <Pressable onPress={onRegister} style={styles.submitBtn1}>
                  <Text style={styles.submitBtnText}>상품 등록하기</Text>
                </Pressable>
              </LinearGradient>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    wordBreak: "break-all",
    alignItems: "center",
  },
  writePostContent: {
    width: "90%",
    height: "100%",
    position: "relative",
    top: "14%",
  },
  localTradeTitle: {
    marginVertical: "6%",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 21,
  },
  selectedImagesView: {
    // display: 'flex',
    flexDirection: "row",
    height: "11%",
  },
  selectImageBtn: {
    backgroundColor: "#ddd",
    width: "27%",
    marginRight: "3%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImagesContainer: {
    flexDirection: "row",
  },
  selectedImageContainer: {
    marginRight: "5%",
  },
  removeImageBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  selectedImage: {
    width: 93,
    height: 93,
  },
  inputTextView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "68%",
  },
  input: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#a0a0a0",
    marginTop: "2%",
    paddingLeft: "2%",
  },
  detailInput: {
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#a0a0a0",
    marginTop: "2%",
    paddingHorizontal: "2%",
    paddingTop: "3%",
  },
  submitBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "10%",
    backgroundColor: Variables.btnColor,
    borderRadius: 5,
  },
  submitBtn1: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  inputTitle: {
    marginBottom: "2%",
    fontSize: 14,
  },
});
