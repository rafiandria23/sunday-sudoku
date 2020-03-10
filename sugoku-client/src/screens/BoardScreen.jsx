import React from 'react';
import { View, Text } from 'react-native';

import { SudokuBoard } from '../components';

export default ({ navigation, route }) => {
  const difficulty = route.params.difficulty;
  
  return (
    <View>
      <SudokuBoard difficulty={difficulty} />
    </View>
  );
};
