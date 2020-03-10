import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'

import styles from '../styles';

import { setPlayerName, setPlayerDifficulty } from '../actions/playerActions';
import { fetchBoard } from '../actions/boardActions';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.playerReducer.name);

  const handleChangeName = (name) => {
    dispatch(setPlayerName(name));
  }

  return (
    <View style={styles.container}>
      <Text>Please type your name:</Text>
      <TextInput style={customStyles.nameField} value={playerName} onChangeText={text => handleChangeName(text)} />
    </View>
  );
};

const customStyles = StyleSheet.create({
  nameField: {
    width: 300,
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    fontSize: 30,
    textAlign: "center",
    margin: 20
  }
});
