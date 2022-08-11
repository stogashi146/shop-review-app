import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
// screen
import { HomeStackNavigator } from "./HomeStackNavigator";
import { UserScreen } from "../screens/UserScreen";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#900",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
