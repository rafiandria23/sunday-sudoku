import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../styles';

import { setPlayerName, setPlayerDifficulty } from '../actions/playerActions';
import { fetchBoard } from '../actions/boardActions';

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.playerReducer.name);

  const handleChangeName = name => {
    dispatch(setPlayerName(name));
  };

  const handleNextButton = () => {
    if (playerName.length < 1) {
      alert('Player name cannot be empty!');
    } else {
      // dispatch(fetchBoard(playerDifficulty));
      // navigation.navigate('Board', { difficulty: playerDifficulty });
      navigation.navigate('Difficulty Selection');
    }
  };

  return (
    <View style={styles.container}>
      <View style={customStyles.nameContainer}>
        <Text>Please type your name:</Text>
        <TextInput
          style={customStyles.nameField}
          value={playerName}
          onChangeText={text => handleChangeName(text)}
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={handleNextButton}
          style={customStyles.nextButton}
        >
          <Text style={customStyles.nextButtonText}>Next!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const customStyles = StyleSheet.create({
  nameField: {
    width: 300,
    height: 50,
    borderColor: 'blue',
    borderWidth: 3,
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    padding: 8,
    borderRadius: 8
  },
  nextButton: {
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 8,
    width: 200
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  nameContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});
