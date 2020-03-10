const initialState = {
  board: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOARD':
      return { ...state, board: action.payload.board };
  
    default:
      return state;
  }
};
