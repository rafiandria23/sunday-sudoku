import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet, Button } from "react-native";
import axios from "axios";

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
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function SudokuBoard(props) {
  const { difficulty = "easy" } = props;
  const [board, setBoard] = useState([]);

  useEffect(() => {
    api
      .get(`/board?difficulty=${difficulty}`)
      .then(({ data }) => {
        setBoard(data.board);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, [difficulty]);

  const handleNumberChange = (text, coordinate) => {
    const nums = "0123456789";
    if (board[coordinate[0]][coordinate[1]]) {
      alert(`You can't change THE DEFAULT VALUE!`);
    } else if (!nums.includes(text)) {
      alert("Please enter NUMBER!");
    } else if (text.length > 1) {
      alert("Please enter ONLY NUMBER BETWEEN 0-9!");
    } else {
      const boardToChange = [...board];
      boardToChange[coordinate[0]][coordinate[1]] = text;
      setBoard(boardToChange);
    }
  };

  const renderBoard = () => {
    const boardContainer = board.map((item, conIdx) => {
      const subItems = item.map((subItem, idx) => {
        return (
          <TextInput
            onChangeText={text => handleNumberChange(text, [conIdx, idx])}
            key={idx}
            style={styles.boardItem}
            value={subItem === 0 ? "" : String(subItem)}
          />
        );
      });
      return <View style={styles.boardContainer}>{subItems}</View>;
    });
    return <View>{boardContainer}</View>;
  };

  const validateSudoku = () => {
    const boardToValidate = board.map(item => {
      const subItems = item.map(subItem => {
        return subItem === "" ? 0 : Number(subItem);
      });
      return subItems;
    });

    const encodeBoard = board =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row)}%5D${
            i === board.length - 1 ? "" : "%2C"
          }`,
        ""
      );

    const encodeParams = params =>
      Object.keys(params)
        .map(key => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    api
      .post("/validate", encodeParams({ board: boardToValidate }))
      .then(({ data }) => {
        alert(data.status.toUpperCase());
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const solveSudoku = () => {
    const boardToSolve = board.map(item => {
      const subItems = item.map(subItem => {
        return subItem === "" ? 0 : Number(subItem);
      });
      return subItems;
    });
    api
      .post("/solve", { board: boardToSolve })
      .then(({ data }) => {
        setBoard(data.solution);
        alert(data.status.toUpperCase());
      })
      .catch(err => {
        console.log(err.response);
      });
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
      </View>
    </View>
  );
}
