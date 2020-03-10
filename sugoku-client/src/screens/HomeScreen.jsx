import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles";

import { setPlayerName, setPlayerDifficulty } from "../actions/playerActions";
import { fetchBoard } from "../actions/boardActions";

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
      dispatch(fetchBoard(playerDifficulty));
      navigation.navigate('Board', {difficulty: playerDifficulty});
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Please type your name:</Text>
        <TextInput
          style={customStyles.nameField}
          value={playerName}
          onChangeText={text => handleChangeName(text)}
        />
      </View>

      <View>
        <Text>Select difficulty</Text>
        <Picker
          selectedValue={playerDifficulty}
          style={customStyles.difficultyPicker}
          onValueChange={itemValue => handleDifficultyChange(itemValue)}
        >
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
      </View>
    
      <View>
        <TouchableOpacity onPress={handlePlayButton} style={customStyles.playButton}>
          <Text>Play!</Text>
        </TouchableOpacity>
      </View>
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
    margin: 20,
    padding: 10,
    borderRadius: 8
  },
  difficultyPicker: {
    height: 10,
    width: 100
  },
  playButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
