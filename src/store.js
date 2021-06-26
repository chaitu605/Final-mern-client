import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import loginReducer from "./reducers/loginReducer";

// combining all reducers
const allReducers = combineReducers({
  user: loginReducer,
});

// create a store
const store = createStore(
  allReducers,
  compose(composeWithDevTools(applyMiddleware(thunkMiddleware)))
);
console.log(store.getState());
export default store;
