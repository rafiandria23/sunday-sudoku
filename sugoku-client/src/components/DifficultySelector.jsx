import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../styles';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const playerDifficulty = useSelector(state => state.playerReducer.difficulty);

  const handleDifficultyChange = difficulty => {
    dispatch(setPlayerDifficulty(difficulty));
  };

  return (
    <View style={customStyles.difficultyContainer}>
      <Text>Select Difficulty</Text>
      <Picker
        selectedValue={playerDifficulty}
        style={customStyles.difficultyPicker}
        onValueChange={itemValue => handleDifficultyChange(itemValue)}
      >
        <Picker.Item label='Easy' value='easy' />
        <Picker.Item label='Medium' value='medium' />
        <Picker.Item label='Hard' value='hard' />
      </Picker>
    </View>
  );
};

const customStyles = StyleSheet.create({
  difficultyPicker: {
    height: 100,
    width: 200
  },
  difficultyContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 20
  }
});
