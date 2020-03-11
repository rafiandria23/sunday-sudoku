import React, { useEffect } from "react";
import { TextInput, View, StyleSheet, Animated } from "react-native";
import { useDispatch } from "react-redux";

import { setSudoku } from "../actions/boardActions";

export default props => {
  const dispatch = useDispatch();
  const animatedValue = new Animated.Value(0);
  const { board, navigation, route } = props;

  const generateRandomColor = () => {
    const randomColor =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    return randomColor;
  };

  const repeatRandomColors = times => {
    return "a"
      .repeat(times)
      .split("")
      .map(color => generateRandomColor());
  };

  const increaseDouble = (targetNumber, increment) => {
    const result = [];
    for (let i = 0; i <= targetNumber; i += +`0.${increment}`) {
      result.push(+i.toFixed(1));
    }
    return result;
  };

  // const backgroundColorConfig = animatedValue.interpolate({
  //   inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
  //   outputRange: [
  //     "#E2EF70",
  //     "#F038FF",
  //     "#CA61C3",
  //     "#CA61C3",
  //     "#3772FF",
  //     "#70E4EF"
  //   ]
  // });

  console.log(increaseDouble(1));

  const backgroundColorConfig = animatedValue.interpolate({
    inputRange: increaseDouble(1, 2),
    outputRange: repeatRandomColors(6)
  });

  const startBackgroundColorAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 15000
      })
    ).start();
  };

  useEffect(() => {
    startBackgroundColorAnimation();
  }, []);

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
          <Animated.View
            key={indexKey}
            style={[{ backgroundColor: backgroundColorConfig }]}
          >
            <TextInput
              onChangeText={text => handleNumberChange(text, [rowIdx, colIdx])}
              style={
                col.val.length > 0 ? styles.boardItemFilled : styles.boardItem
              }
              value={col.val}
              keyboardType="number-pad"
              editable={col.canChange}
            />
          </Animated.View>
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
    borderColor: "white",
    borderWidth: 1,
    fontSize: 20,
    color: "black",
    textAlign: "center"
  },
  boardItemFilled: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 0.1,
    borderColor: "grey",
    fontSize: 20,
    color: "black",
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
