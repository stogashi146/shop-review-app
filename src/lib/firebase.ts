import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Constants from "expo-constants";
import { Shop } from "../types/shop";
import { User, initialUser } from "../types/user";
import { Review } from "../types/review";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest!.extra!.firebase);
}

export const getShops = async () => {
  const snapshot = await firebase
    .firestore()
    .collection("shops")
    .orderBy("score", "desc")
    .get();
  const shops = snapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Shop)
  );
  return shops;
};

export const signin = async () => {
  // 匿名でサインインする
  const userCredential = await firebase.auth().signInAnonymously();
  // @ts-ignore uisで型エラーのため無視するよう記述
  const { uid } = userCredential.user;
  // usersコレクションから、uidを取得する
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  // Userが存在しなければ初期値を登録
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    return {
      ...initialUser,
      id: uid, // firebaseはIDも持たないため明示的に持たせる
    } as User;
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    } as User;
  }
};

export const updateUser = async (userId: string, params: any) => {
  await firebase.firestore().collection("users").doc(userId).update(params);
};

export const createReviewRef = async (shopId: string) => {
  return await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("reviews")
    .doc();
};

export const uploadImage = async (uri: string, path: string) => {
  // uriをblobに変換
  const localUri = await fetch(uri);
  const blob = await localUri.blob();
  // storageにupload
  const ref = firebase.storage().ref().child(path);

  let downloadUrl = "";
  try {
    await ref.put(blob);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
};

export const getReviews = async (shopId: string) => {
  const reviewDocs = await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get();
  return reviewDocs.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Review)
  );
};
