const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload.status };

    default:
      return state;
  }
};
