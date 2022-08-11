import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// navigator
import { MainTabNavigator } from "./MainTabNivagtor";
// screen
import { AuthScreen } from "../screens/AuthScreen";

export const AppNavigator = () => {
  const user = { id: 100 && null };

  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
