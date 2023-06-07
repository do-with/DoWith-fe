import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Alert,
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
  const [selectedClassify, setSelectedClassify] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [content, setContent] = useState("");
  const githubURLs = [];

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "디지털기기", value: 1 },
    { label: "가구/인테리어", value: 2 },
    { label: "유아동", value: 3 },
    { label: "여성의류", value: 4 },
    { label: "여성잡화", value: 5 },
    { label: "남성패션", value: 6 },
    { label: "남성잡화", value: 7 },
    { label: "생활가전", value: 8 },
    { label: "생활/주방", value: 9 },
    { label: "가공식품", value: 10 },
    { label: "스포츠/레저", value: 11 },
    { label: "취미/게임/음반", value: 12 },
    { label: "뷰티/미용", value: 13 },
    { label: "반려동물용품", value: 14 },
    { label: "티켓/교환권", value: 15 },
    { label: "도서", value: 16 },
    { label: "유아도서", value: 17 },
    { label: "기타 중고물품", value: 18 },
  ]);

  useEffect(() => {
    console.log(imageUris);
  }, [imageUris]);

  const { user } = useContext(AuthContext);
  const user_id = user.id;
  const user_region = user.region;

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

      if (newImageUris.length > 2) {
        // 이미지가 2개를 초과한 경우
        Alert.alert("이미지는 두 장만 업로드할 수 있습니다.");
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

  const handlePriceChange = (text) => {
    // 숫자 이외의 문자 제거
    const cleanedText = text.replace(/[^0-9]/g, "");

    setPrice(cleanedText);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onRegister = async () => {
    setIsLoading(true);
    if (imageUris.length === 0) {
      Alert.alert("물품 이미지를 업로드해주세요");
    } else if (imageUris.length === 1) {
      Alert.alert("물품 이미지를 한 장 더 업로드해주세요");
    } else if (selectedClassify === null) {
      Alert.alert("물품 분류를 선택해주세요");
    } else if (title === "") {
      Alert.alert("물품명을 설정해주세요");
    } else if (price === null) {
      Alert.alert("물품 가격을 설정해주세요");
    } else if (content === "") {
      Alert.alert("물품 설명을 기재해주세요");
    } else if (
      imageUris.length === 2 &&
      price &&
      title &&
      selectedClassify &&
      content
    )
      try {
        await createFile(imageUris);

        const data = {
          name: title,
          price: price,
          description: content,
          sold_yn: false,
          image1GitHubURL: githubURLs[0] || null,
          image2GitHubURL: githubURLs[1] || null,
          category: selectedClassify,
          region: user_region,
        };

        axios
          .post(
            `http://${ipAddress}:8080/local-trade/user/${user_id}/create`,
            data
          )
          .then((response) => {
            // console.log(response);
            navigation.navigate("LocalTrade", { key: Date.now() });
            setIsLoading(false);
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
        <KeyboardAwareScrollView
          contentContainerStyle={{
            width: "100%",
            height: "90%",
          }}
        >
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#808080" />
            </View>
          ) : (
            <View style={styles.writePostContent}>
              <Text style={styles.localTradeTitle}>물품 등록하기</Text>
              <View style={{ flexDirection: "row", height: "18%" }}>
                <Pressable onPress={selectImage} style={styles.selectImageBtn}>
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
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.inputTitle, { marginBottom: "4%" }]}>
                  분류{" "}
                </Text>
                <Text style={[styles.inputTitle, { color: "#FF1919" }]}>*</Text>
              </View>
              <DropDownPicker
                open={open}
                value={selectedClassify}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedClassify}
                setItems={setItems}
                placeholder="물품 분류를 선택해주세요"
                listMode="MODAL"
                modalProps={{
                  animationType: "fade",
                }}
                modalTitle="물품 분류 선택"
                style={{
                  borderWidth: 0.5,
                  minHeight: "8%",
                  marginBottom: "2%",
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>물품명 </Text>
                <Text style={[styles.inputTitle, { color: "#FF1919" }]}>*</Text>
              </View>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="물품명을 입력해주세요"
                style={styles.input}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>가격 </Text>
                <Text style={[styles.inputTitle, { color: "#FF1919" }]}>*</Text>
              </View>
              <TextInput
                value={price}
                onChangeText={handlePriceChange}
                placeholder="가격을 설정해주세요"
                style={styles.input}
                keyboardType="numeric"
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputTitle}>물품 설명 </Text>
                <Text style={[styles.inputTitle, { color: "#FF1919" }]}>*</Text>
              </View>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="물품 설명을 입력해주세요"
                style={[styles.detailInput]}
                multiline={true}
              />
            </View>
          )}

          <LinearGradient
            colors={["#4A6BAC", "#1B3974"]}
            style={styles.submitBtn}
          >
            <Pressable onPress={onRegister} style={styles.submitBtn1}>
              <Text style={styles.submitBtnText}>상품 등록하기</Text>
            </Pressable>
          </LinearGradient>
        </KeyboardAwareScrollView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  joinBody: {
    width: "100%",
    height: "100%",
    wordBreak: "break-all",
    alignItems: "center",
    backgroundColor: Variables.mainColor,
  },
  writePostContent: {
    width: "93%",
    height: "80%",
    position: "relative",
    top: "14%",
    backgroundColor: "#fff",
    paddingHorizontal: "7%",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#8B8B8B",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    marginTop: "3%",
    boxSizing: "border-box",
    paddingVertical: "3%",
  },
  localTradeTitle: {
    marginVertical: "6%",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 21,
  },
  selectImageBtn: {
    backgroundColor: "#ddd",
    width: "30%",
    marginRight: "3%",
    height: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImageContainer: {
    marginRight: "3%",
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
    width: 135,
    height: "7%",
    backgroundColor: Variables.btnColor,
    borderRadius: 5,
    bottom: "-16%",
    left: "60%",
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
    fontSize: 18,
  },
  inputTitle: {
    marginTop: "3%",
    marginBottom: "2%",
    fontSize: 14,
  },
});
