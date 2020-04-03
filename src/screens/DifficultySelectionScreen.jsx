import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles';

import { DifficultySelector } from '../components';

export default ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <DifficultySelector navigation={navigation} route={route} />
    </View>
  );
};
