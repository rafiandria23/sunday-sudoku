import React from "react";
import { View, Text, StyleSheet, Picker, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// import styles from '../styles';

import { setPlayerDifficulty } from "../actions/playerActions";
import { addPlayer } from "../actions/leaderboardActions.js";

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.playerReducer.name);
  const playerScore = useSelector(state => state.playerReducer.score);
  const playerDifficulty = useSelector(state => state.playerReducer.difficulty);
  const leaderboard = useSelector(state => state.leaderboardReducer.players);

  const handleDifficultyChange = difficulty => {
    dispatch(setPlayerDifficulty(difficulty));
  };

  const handlePlayButton = () => {
    const playerData = {
      name: playerName,
      score: playerScore
    };
    const validatedPlayers = leaderboard.filter(
      player => player.name === playerData.name
    );
    if (validatedPlayers.length > 0) {
      navigation.navigate("Board", { difficulty: playerDifficulty });
    } else {
      dispatch(addPlayer(playerData));
      navigation.navigate("Board", { difficulty: playerDifficulty });
    }
  };

  return (
    <View style={customStyles.difficultyContainer}>
      <Text style={customStyles.headerTitle}>Select Difficulty</Text>
      <Picker
        selectedValue={playerDifficulty}
        style={customStyles.difficultyPicker}
        onValueChange={itemValue => handleDifficultyChange(itemValue)}
      >
        <Picker.Item color="green" label="Easy" value="easy" />
        <Picker.Item color="orange" label="Medium" value="medium" />
        <Picker.Item color="red" label="Hard" value="hard" />
      </Picker>
      <TouchableOpacity
        style={customStyles.playButton}
        onPress={handlePlayButton}
      >
        <Text style={customStyles.playText}>Play!</Text>
      </TouchableOpacity>
    </View>
  );
};

const customStyles = StyleSheet.create({
  difficultyPicker: {
    height: 200,
    width: 200,
    margin: 20
  },
  difficultyContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 20
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold"
  },
  playText: {
    color: "white"
  },
  playButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 8
  }
});
