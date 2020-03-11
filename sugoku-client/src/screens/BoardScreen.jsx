import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CountDown from "react-native-countdown-component";
import LottieView from "lottie-react-native";

import { SudokuBoard } from "../components";
import capitalize from "../helpers/capitalize";
import {
  fetchBoard,
  validateSudoku,
  solveSudoku,
  resetSudoku,
  setSudoku,
  setSudokuStatus
} from "../actions/boardActions";

export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.playerReducer.name);
  const playerScore = useSelector(state => state.playerReducer.score);
  const loading = useSelector(state => state.gameReducer.loading);
  const difficulty = route.params.difficulty;
  const board = useSelector(state => state.boardReducer.board);
  const status = useSelector(state => state.boardReducer.status);

  useEffect(() => {
    dispatch(setSudokuStatus(""));
    dispatch(fetchBoard(difficulty));
  }, [difficulty]);

  useEffect(() => {
    if (status.length > 0) {
      alert(`${capitalize(status)}!`);
      dispatch(setSudokuStatus(""));
    }
  }, [status]);

  const countdownOnFinish = () => {
    navigation.navigate("Finish");
  };

  const handleFinishButton = () => {
    navigation.navigate("Finish");
  };

  const renderBoardScreen = () => {
    return (
      <>
        <View>
          <Text
            style={customStyles.playerGreeterText}
          >{`Happy solving, ${playerName}!`}</Text>
        </View>
        <View style={customStyles.playerDataContainer}>
          <View style={customStyles.playerDataItem}>
            <Text
              style={customStyles.timeRemainingText}
            >{`Time Remaining`}</Text>
            <CountDown
              style={customStyles.countdown}
              until={60 * 15}
              size={20}
              onFinish={countdownOnFinish}
              digitStyle={{ backgroundColor: "#FFF" }}
              digitTxtStyle={{ color: "blue" }}
              timeToShow={["M", "S"]}
            />
          </View>
          <View style={customStyles.playerDataItem}>
            <View style={customStyles.totalScoreContainer}>
              <Text style={customStyles.totalScore}>{`Total Score`}</Text>
              <Text style={customStyles.totalScore}>{playerScore}</Text>
            </View>
            <View style={customStyles.difficultyStatusContainer}>
              <Text style={customStyles.difficultyStatus}>{`Difficulty`}</Text>
              <Text style={customStyles.difficultyStatus}>{playerScore}</Text>
            </View>
          </View>
        </View>
        <View>
          <SudokuBoard navigation={navigation} route={route} board={board} />
          <View style={customStyles.buttonGroup}>
            <View style={customStyles.difficultyPicker}>
              <Text>Pick a difficulty:</Text>
              <TouchableOpacity
                style={customStyles.difficultyButtonEasy}
                onPress={() => dispatch(fetchBoard("easy"))}
              >
                <Text style={customStyles.difficultyText}>Easy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={customStyles.difficultyButtonMedium}
                onPress={() => dispatch(fetchBoard("medium"))}
              >
                <Text style={customStyles.difficultyText}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={customStyles.difficultyButtonHard}
                onPress={() => dispatch(fetchBoard("hard"))}
              >
                <Text style={customStyles.difficultyText}>Hard</Text>
              </TouchableOpacity>
            </View>
            <View style={customStyles.boardAction}>
              <TouchableOpacity
                style={customStyles.button}
                onPress={() => dispatch(validateSudoku(board))}
              >
                <Text style={customStyles.buttonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={customStyles.button}
                onPress={() => dispatch(solveSudoku(board))}
              >
                <Text style={customStyles.buttonText}>Give Up!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={customStyles.button}
                onPress={() => dispatch(resetSudoku(board))}
              >
                <Text style={customStyles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style={customStyles.boardAction}>
              <TouchableOpacity
                style={customStyles.runAwayButton}
                onPress={handleFinishButton}
              >
                <Text style={customStyles.runAwayText}>RUN AWAY??</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderLottieLoading = () => {
    return (
      <LottieView
        autoPlay
        style={customStyles.lottieLoading}
        source={require("../../assets/island.json")}
      />
    );
  };

  return (
    <View style={customStyles.boardContainer}>
      {loading ? renderLottieLoading() : renderBoardScreen()}
    </View>
  );
};

const customStyles = StyleSheet.create({
  boardContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 12
  },
  playerDataContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "baseline"
  },
  playerDataItem: {
    flex: 3,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 10
  },
  playerGreeterText: {
    fontWeight: "bold",
    fontSize: 25
  },
  sudokuTimerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "baseline"
  },
  timeRemainingText: {
    marginVertical: 5
  },
  countdown: {
    marginVertical: 5
  },
  playerDetails: {
    alignItems: "flex-start"
  },
  totalScore: {
    marginVertical: 5
  },
  lottieLoading: {
    height: 200,
    width: 200
  },
  buttonGroup: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  },
  button: {
    backgroundColor: "pink",
    padding: 12,
    margin: 10,
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    fontSize: 20
  },
  difficultyPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: 10,
    margin: 10
  },
  difficultyButtonEasy: {
    backgroundColor: "green",
    padding: 8,
    margin: 8,
    borderRadius: 8
  },
  difficultyButtonMedium: {
    backgroundColor: "orange",
    padding: 8,
    margin: 8,
    borderRadius: 8
  },
  difficultyButtonHard: {
    backgroundColor: "red",
    padding: 8,
    margin: 8,
    borderRadius: 8
  },
  difficultyText: {
    color: "white"
  },
  boardAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  runAwayButton: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 8
  },
  runAwayText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});
