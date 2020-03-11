import React from "react";
import { View, Text } from "react-native";

import styles from "../styles";

import { Leaderboard } from "../components";

export default ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Leaderboard />
    </View>
  );
};
