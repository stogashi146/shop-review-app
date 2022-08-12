import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import firebase from "firebase";
import { updateUser } from "../lib/firebase";
// components
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
// contexts
import { UserContext } from "../contexts/userContext";
// types
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string>(user!.name);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    const updateAt = firebase.firestore.Timestamp.now();
    await updateUser(user!.id!, { name, updateAt });
    setUser({ ...user!, name, updateAt });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
});
