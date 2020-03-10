import React, { useEffect } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import capitalize from '../helpers/capitalize';
import {
  fetchBoard,
  validateSudoku,
  solveSudoku,
  resetSudoku,
  setSudoku,
  setSudokuStatus
} from '../actions/boardActions';
import defaultStyles from '../styles';

export default props => {
  const dispatch = useDispatch();
  const { difficulty } = props;
  const board = useSelector(state => state.boardReducer.board);
  const status = useSelector(state => state.boardReducer.status);
  const loading = useSelector(state => state.gameReducer.loading);

  useEffect(() => {
    dispatch(setSudokuStatus(''));
    dispatch(fetchBoard(difficulty));
  }, [difficulty]);

  useEffect(() => {
    if (status.length > 0) {
      alert(`${capitalize(status)}!`);
      dispatch(setSudokuStatus(''));
    }
  }, [status]);

  const handleNumberChange = (text, coordinate) => {
    const nums = '123456789';

    switch (text) {
      case ' ':
        alert('Please enter a number between 1-9!');
        break;

      case '0':
        alert(`You can't enter 0 or zero!`);
        break;

      default:
        if (text.length > 1) {
          alert('Please enter a number between 1-9!');
        } else if (!nums.includes(text)) {
          alert('Please enter number type only!');
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
            keyboardType='number-pad'
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
    return (
      <View style={styles.mainContainer}>
        {boardContainer}
        <View style={styles.buttonGroup}>
          <View style={styles.levelPicker}>
            <Text>Pick a level:</Text>
            <TouchableOpacity
              style={styles.levelButton}
              onPress={() => dispatch(fetchBoard('easy'))}
            >
              <Text>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.levelButton}
              onPress={() => dispatch(fetchBoard('medium'))}
            >
              <Text>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.levelButton}
              onPress={() => dispatch(fetchBoard('hard'))}
            >
              <Text>Hard</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.boardAction}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(validateSudoku(board))}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(solveSudoku(board))}
            >
              <Text style={styles.buttonText}>Give Up!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(resetSudoku(board))}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {loading !== true ? (
        renderBoard()
      ) : (
        <ActivityIndicator
          style={defaultStyles.centerOnly}
          size='large'
          color='#0000ff'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boardItem: {
    width: 40,
    height: 40,
    borderColor: 'pink',
    borderWidth: 1,
    fontSize: 20,
    color: 'green',
    textAlign: 'center'
  },
  boardItemFilled: {
    width: 40,
    height: 40,
    borderColor: 'pink',
    backgroundColor: 'blue',
    borderWidth: 1,
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  boardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 6
  },
  buttonGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
  },
  button: {
    backgroundColor: 'pink',
    padding: 12,
    margin: 10,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  levelPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    backgroundColor: 'violet',
    padding: 10,
    margin: 10,
    borderRadius: 8
  },
  levelButton: {
    color: 'blue',
    padding: 8,
    margin: 8
  },
  boardAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  }
});
