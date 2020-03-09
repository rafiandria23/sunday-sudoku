import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SudokuBoard from './components/SudokuBoard';

export default function App() {
  return (
    <View style={styles.container}>
      <SudokuBoard difficulty='easy' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
