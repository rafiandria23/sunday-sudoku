import axios from 'axios';

const api = axios.create({ baseURL: "https://sugoku.herokuapp.com" });

const fetchBoardCompleted = (board) => ({
  type: 'FETCH_BOARD',
  payload: {
    board
  }
});

export const fetchBoard = (difficulty) => {
  return (dispatch) => {
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
        dispatch(fetchBoardCompleted(defaultBoardCoordinates));
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

const restoredBoard = board => {
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
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );
};

const encodeParams = params => {
  return Object.keys(params)
    .map(key => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");
};

const validateSudokuCompleted = board => ({
  type: 'VALIDATE_SUDOKU',
  payload: {
    board
  }
});

export const validateSudoku = (board) => {
  return dispatch => {
    api
      .post("/validate", encodeParams({ board: restoredBoard(board) }))
      .then(({ data }) => {
        alert(`${capitalize(data.status)}!`);
        dispatch(validateSudokuCompleted(board));
      })
      .catch(err => {
        console.log(err.response);
      });
  }
};

const solveSudokuCompleted = (board) => ({
  type: 'SOLVE_SUDOKU',
  payload: {
    board
  }
});

export const solveSudoku = (board) => {
  return dispatch => {
    api
      .post("/solve", encodeParams({ board: restoredBoard() }))
      .then(({ data }) => {
        alert(`${capitalize(data.status)}!`);
        const apiBoard = data.solution;
        const defaultBoardCoordinates = apiBoard.map(row => {
          return row.map(col => {
            if (col === 0) {
              return { val: "", canChange: true };
            }
            return { val: String(col), canChange: false };
          });
        });
        dispatch(solveSudokuCompleted(defaultBoardCoordinates));
      })
      .catch(err => {
        console.log(err.response);
      });
  }
}

const resetSudokuCompleted = (board) => ({
  type: 'RESET_SUDOKU',
  payload: {
    board
  }
});

export const resetSudoku = (board) => {
  return dispatch => {
    const boardToReset = board.map(row => {
      return row.map(col => {
        col.val = "";
        return col;
      });
    });
    dispatch(resetSudokuCompleted(boardToReset));
  }
};
