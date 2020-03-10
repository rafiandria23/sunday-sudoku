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
  const playerDifficulty = useSelector(state => state.playerReducer.difficulty);

  const handleChangeName = name => {
    dispatch(setPlayerName(name));
  };

  const handleDifficultyChange = difficulty => {
    dispatch(setPlayerDifficulty(difficulty));
  };

  const handlePlayButton = () => {
    if (playerName.length < 1) {
      alert('Player name cannot be empty!');
    } else {
      // dispatch(fetchBoard(playerDifficulty));
      navigation.navigate('Board', { difficulty: playerDifficulty });
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

      <View style={customStyles.difficultyContainer}>
        <Text>Select difficulty</Text>
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

      <View>
        <TouchableOpacity
          onPress={handlePlayButton}
          style={customStyles.playButton}
        >
          <Text style={customStyles.playButtonText}>Play!</Text>
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
  difficultyPicker: {
    height: 100,
    width: 200
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 8,
    width: 200
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  nameContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  difficultyContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 20
  }
});
