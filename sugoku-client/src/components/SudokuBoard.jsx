import React, { useEffect } from "react";
import { TextInput, View, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import capitalize from "../helpers/capitalize";
import {
  fetchBoard,
  validateSudoku,
  solveSudoku,
  resetSudoku,
  setSudoku
} from "../actions/boardActions";

const styles = StyleSheet.create({
  boardItem: {
    width: 40,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 20,
    textAlign: "center"
  },
  boardItemFilled: {
    width: 40,
    height: 40,
    borderColor: "black",
    backgroundColor: "blue",
    borderWidth: 1,
    fontSize: 20,
    textAlign: "center"
  },
  boardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%"
  },
  buttonGroup: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  }
});

export default props => {
  const dispatch = useDispatch();
  const { difficulty } = props;
  const board = useSelector(state => state.boardReducer.board);

  useEffect(() => {
    dispatch(fetchBoard(difficulty));
  }, [difficulty]);

  const handleNumberChange = (text, coordinate) => {
    const nums = "123456789";

    switch (text) {
      case " ":
        alert("Please enter a number between 1-9!");
        break;

      case "0":
        alert(`You can't enter 0 or zero!`);
        break;

      default:
        if (text.length > 1) {
          alert("Please enter a number between 1-9!");
        } else if (!nums.includes(text)) {
          alert("Please enter number type only!");
        } else {
          const boardToChange = [...board];
          boardToChange[coordinate[0]][coordinate[1]].val = text;
          dispatch(setSudoku(boardToChange));
        }
        break;
    }
  };

  const renderBoard = () => {
    let indexKey = 1;
    const boardContainer = board.map((row, rowIdx) => {
      indexKey++;
      const columns = row.map((col, colIdx) => {
        indexKey++;
        return (
          <TextInput
            onChangeText={text => handleNumberChange(text, [rowIdx, colIdx])}
            key={indexKey}
            style={
              col.val.length > 0 ? styles.boardItemFilled : styles.boardItem
            }
            value={col.val}
            keyboardType="number-pad"
            // onKeyPress={({ nativeEvent }) =>
            //   handleNumberChange(nativeEvent, [rowIdx, colIdx])
            // }
            editable={col.canChange}
          />
        );
      });
      return (
        <View key={indexKey} style={styles.boardContainer}>
          {columns}
        </View>
      );
    });
    return <View>{boardContainer}</View>;
  };

  return (
    <View style={styles.mainContainer}>
      {board.length > 0 && renderBoard()}
      <View style={styles.buttonGroup}>
        <Button
          style={styles.applyButton}
          title="Apply"
          onPress={() => dispatch(validateSudoku(board))}
        />
        <Button
          style={styles.applyButton}
          title="Give Up!"
          onPress={() => dispatch(solveSudoku(board))}
        />
        <Button
          style={styles.applyButton}
          title="Reset"
          onPress={() => dispatch(resetSudoku(board))}
        />
      </View>
    </View>
  );
};
