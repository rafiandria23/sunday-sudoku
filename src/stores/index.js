import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  boardReducer,
  playerReducer,
  gameReducer,
  leaderboardReducer
} from "../reducers";

const reducers = combineReducers({
  boardReducer,
  playerReducer,
  gameReducer,
  leaderboardReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
