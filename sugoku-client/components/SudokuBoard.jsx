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
  borderContainer: {
    flex: 1,
    flexDirection: "row"
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "35%"
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
  }, []);

  const handleNumberChange = (text, coordinate) => {
    const nums = "0123456789";
    if (!nums.includes(text)) {
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
      return <View>{subItems}</View>;
    });
    return <View style={styles.borderContainer}>{boardContainer}</View>;
  };

  const validateSudoku = () => {
    const boardToValidate = board.map(item => {
      const subItems = item.map(subItem => {
        return subItem === "" ? 0 : Number(subItem);
      });
      return subItems;
    });
    api
      .post("/validate", { board: boardToValidate })
      .then(({ data }) => {
        alert(data.status.toUpperCase());
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <View style={styles.mainContainer}>
      {board.length > 0 && renderBoard()}
      <View>
        <Button
          style={styles.applyButton}
          title="Apply"
          onPress={() => validateSudoku()}
        />
      </View>
    </View>
  );
}
