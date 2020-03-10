import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet, Button } from "react-native";
import axios from "axios";

import capitalize from "../helpers/capitalize";

const api = axios.create({ baseURL: "https://sugoku.herokuapp.com" });

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
    backgroundColor: 'blue',
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

export default function SudokuBoard(props) {
  const { difficulty = "easy" } = props;
  const [board, setBoard] = useState([]);

  useEffect(() => {
    api
      .get(`/board?difficulty=${difficulty}`)
      .then(({ data }) => {
        const apiBoard = data.board;
        const defaultBoardCoordinates = apiBoard.map(row => {
          return row.map(col => {
            if (col === 0) {
              return { val: "", canChange: true };
            }
            return { val: String(col), canChange: false };
          });
        });
        setBoard(defaultBoardCoordinates);
      })
      .catch(err => {
        console.log(err.response);
      });
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
          setBoard(boardToChange);
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
            style={col.val.length > 0 ? styles.boardItemFilled : styles.boardItem}
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

  const restoredBoard = () => {
    const restoredBoard = board.map(row => {
      return row.map(col => {
        return Number(col.value);
      });
    });
    return restoredBoard;
  };

  const encodeBoard = board => {
    return board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );
  };

  const encodeParams = params => {
    return Object.keys(params)
      .map(key => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");
  };

  const validateSudoku = () => {
    api
      .post("/validate", encodeParams({ board: restoredBoard() }))
      .then(({ data }) => {
        alert(`${capitalize(data.status)}!`);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const solveSudoku = () => {
    api
      .post("/solve", encodeParams({ board: restoredBoard() }))
      .then(({ data }) => {
        setBoard(data.solution);
        alert(`${capitalize(data.status)}!`);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const resetSudoku = () => {
    const boardToReset = board.map(row => {
      return row.map(col => {
        col.val = '';
        return col;
      });
    });
    setBoard(boardToReset);
  };

  return (
    <View style={styles.mainContainer}>
      {board.length > 0 && renderBoard()}
      <View style={styles.buttonGroup}>
        <Button
          style={styles.applyButton}
          title="Apply"
          onPress={() => validateSudoku()}
        />
        <Button
          style={styles.applyButton}
          title="Give Up!"
          onPress={() => solveSudoku()}
        />
        <Button
          style={styles.applyButton}
          title="Reset"
          onPress={() => resetSudoku()}
        />
      </View>
    </View>
  );
}
