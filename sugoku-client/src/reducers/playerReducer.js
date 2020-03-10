const initialState = {
  name: '',
  difficulty: '',
  score: 0,
  hints: 3
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, name: action.payload.name };
  
    case 'SET_PLAYER_DIFFICULTY':
      return { ...state, level: action.payload.difficulty };
    
    case 'SET_PLAYER_SCORE':
      return { ...state, score: action.payload.score };
    
    case 'SET_PLAYER_HINTS':
      return { ...state, hints: action.payload.hints };
    
    default:
      return state;
  }
};
