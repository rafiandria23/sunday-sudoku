import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { boardReducer, playerReducer } from '../reducers';

const reducers = combineReducers({
  boardReducer,
  playerReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
