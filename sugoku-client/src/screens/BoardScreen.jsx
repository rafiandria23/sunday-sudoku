import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SudokuBoard } from '../components';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.playerReducer.name);
  const difficulty = route.params.difficulty;

  return (
    <View style={customStyles.boardContainer}>
      <View>
        <Text
          style={customStyles.userGreeterText}
        >{`Welcome, ${playerName}!`}</Text>
      </View>
      <View style={customStyles.playerDataContainer}>
        <View style={customStyles.playerDataItem}>
          <Text>{`Welcome, ${playerName} LEFT!`}</Text>
        </View>
        <View style={customStyles.playerDataItem}>
          <Text>{`Welcome, ${playerName} RIGHT!`}</Text>
        </View>
      </View>
      <View>
        <SudokuBoard
          navigation={navigation}
          route={route}
          difficulty={difficulty}
        />
      </View>
    </View>
  );
};

const customStyles = StyleSheet.create({
  boardContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  playerDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'baseline'
  },
  playerDataItem: {
    flex: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  userGreeterText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 30
  }
});
