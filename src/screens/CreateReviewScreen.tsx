import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
// components
import { ShopDetail } from "../components/ShopDetail";
import { IconButton } from "../components/IconButton";
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
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton name="x" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation, shop]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Create Review Screen</Text>
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
