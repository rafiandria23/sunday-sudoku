import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { SudokuBoard } from '../components';

export default ({ navigation, route }) => {
  const difficulty = route.params.difficulty;

  return (
    <View style={customStyles.boardContainer}>
      <SudokuBoard difficulty={difficulty} />
    </View>
  );
};

const customStyles = StyleSheet.create({
  boardContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});
