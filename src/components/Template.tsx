import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {};

export const MyComponent: React.FC<Props> = ({}: Props) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create!({
  container: {},
});
