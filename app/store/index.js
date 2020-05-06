import { createStore, combineReducers, applyMiddleware } from 'redux';
import gameReducer from "./reducers/gameReducer";

import thunk from "redux-thunk";

const reducer = combineReducers({
    gameReducer
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;