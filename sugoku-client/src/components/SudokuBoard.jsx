import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { setSudoku } from "../actions/boardActions";

export default props => {
  const dispatch = useDispatch();
  const { board, navigation, route } = props;

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
    return <View style={styles.mainContainer}>{boardContainer}</View>;
  };

  return <View>{renderBoard()}</View>;
};

const styles = StyleSheet.create({
  boardItem: {
    width: 40,
    height: 40,
    borderColor: "pink",
    borderWidth: 1,
    fontSize: 20,
    color: "green",
    textAlign: "center"
  },
  boardItemFilled: {
    width: 40,
    height: 40,
    borderColor: "pink",
    backgroundColor: "blue",
    borderWidth: 1,
    fontSize: 20,
    color: "white",
    textAlign: "center"
  },
  boardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  }
});
