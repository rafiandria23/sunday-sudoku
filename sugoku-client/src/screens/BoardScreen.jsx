import React from 'react';
import { View, Text } from 'react-native';

import { SudokuBoard } from '../components';

export default ({navigation, route}) => {
  return (
    <View>
      <SudokuBoard />
    </View>
  );
};
