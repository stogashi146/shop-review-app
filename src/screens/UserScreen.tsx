import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
// components
import { ShopDetail } from "../components/ShopDetail";
// lib
import { getShops } from "../lib/firebase";
// components
import { ShopReviewItem } from "../components/ShopReviewItem";
// types
import { Shop } from "../types/shop";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationHelpersContext, RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>User Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
