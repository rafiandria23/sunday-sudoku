const initialState = {
  board: [],
  status: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOARD":
      return { ...state, board: action.payload.board };

    case "VALIDATE_SUDOKU":
      return { ...state, board: action.payload.board };

    case "SOLVE_SUDOKU":
      return { ...state, board: action.payload.board };

    case "RESET_SUDOKU":
      return { ...state, board: action.payload.board };
    
    case 'SET_SUDOKU':
      return { ...state, board: action.payload.board };

    case 'SET_SUDOKU_STATUS':
      return { ...state, status: action.payload.status };
    
    default:
      return state;
  }
};
