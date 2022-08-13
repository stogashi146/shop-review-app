import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Alert,
} from "react-native";
import { createReviewRef, uploadImage } from "../lib/firebase";
import { UserContext } from "../contexts/userContext";
import firebase from "firebase";
import { pickImage } from "../lib/imagePicker";
import { getExtention } from "../utils/file";
// components
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
// types
import { RootStackParamList } from "../types/navigation";
import { Review } from "../types/review";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton name="x" onPress={() => navigation.goBack()} />
      ),
    });
  }, [shop]);

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません。");
      return;
    }
    setLoading(true);

    // documentのIDを先に取得
    const reviewDocRef = await createReviewRef(shop.id!);
    // storageのpathを決定
    const ext = getExtention(imageUri); // 拡張子を取得
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    // 画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath);
    // reviewドキュメントを作る
    const review = {
      user: {
        id: user!.id,
        name: user!.name,
      },
      shop: {
        id: shop!.id,
        name: shop.name,
      },
      text,
      score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await reviewDocRef.set(review);

    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri!);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled={false}>
        <StarInput score={score} onChangeScore={(value) => setScore(value)} />
        <TextArea
          value={text}
          onChangeText={(value) => setText(value)}
          label="レビュー"
          placeholder="レビューを書いてください"
        />
        <View style={styles.photoContainer}>
          <IconButton name="camera" onPress={onPickImage} color="#ccc" />
          {!!imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
        <Button text="レビューを投稿する" onPress={onSubmit} />
        <Loading visible={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
