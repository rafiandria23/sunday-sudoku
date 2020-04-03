const initialState = {
  players: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      const newLeaderboard = state.players.concat(action.payload.player);
      const sortedLeaderboard = newLeaderboard.sort(
        (a, b) => a.score > b.score
      );
      return { ...state, players: sortedLeaderboard };

    default:
      return state;
  }
};
