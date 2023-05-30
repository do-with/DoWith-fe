import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TextInput,
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

export default function RegisterLocalTrade({ navigation }) {
  const [imageUris, setImageUris] = useState([]);
  const [selectedClassify, setSelectedClassify] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [content, setContent] = useState("");
  const githubURLs =[];
  

  useEffect(() => {
    console.log(imageUris);
  }, [imageUris]);


const createFile = async (imageUris) => {
    console.log("createFile 함수 실행");
    const token = "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";
    const repository = "whgus613/jinji";
    const commitMessage = "upload image";
  
    try {
      for (let i = 0; i < imageUris.length; i++) {
        const imageUri = imageUris[i];
        const fileInfo = await FileSystem.getInfoAsync(imageUri.uri);
        const currentTime = new Date().toISOString().replace(/:/g, "-").replace(/\s+/g, "");
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
            const downloadUrl = response.data.content.download_url;
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

const onRegister = async () => {
    try {
      await createFile(imageUris);
  
      const user_id = 1;
      const data = {
        name: title,
        price: price,
        describe: content,
        sold_yn: false,
        image1GitHubURL: githubURLs[0] || null,
        image2GitHubURL: githubURLs[1] || null,
      };
  
      axios
        .post(`http://${ipAddress}:8080/local-trade/user/${user_id}/create`, data)
        .then((response) => {
          // console.log(response);
          navigation.navigate("MainScreen");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  return (
    <View style={styles.joinBody}>
      <ScreenHeader headerTitle="기부 거래" />
      <View style={styles.writePostContent}>
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
          <View>
            <Text style={{ paddingBottom: "2%" }}>분류</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedClassify(value)}
              items={[
                { label: "옵션 1", value: "option1" },
                { label: "옵션 2", value: "option2" },
                { label: "옵션 3", value: "option3" },
              ]}
              placeholder={{
                label: "분류를 선택해주세요",
                value: null,
                color: "#a0a0a0",
              }}
            />
          </View>
          <View>
            <Text>상품명</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="제목을 입력해주세요"
              style={styles.input}
            />
          </View>
          <View>
            <Text>가격</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="가격을 설정해주세요"
              style={styles.input}
            />
          </View>
          <View>
            <Text>설명</Text>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="상품 설명을 적어주세요"
              style={[styles.detailInput]}
            />
          </View>
          <LinearGradient
            colors={["#4A6BAC", "#1B3974"]}
            style={styles.submitBtn}
          >
            <Pressable onPress={onRegister}>
              <Text style={styles.submitBtnText}>상품 등록하기</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </View>
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
    paddingLeft: "2%",
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
  submitBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
