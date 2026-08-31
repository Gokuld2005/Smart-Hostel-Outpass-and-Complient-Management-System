import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import {
  outpassCreateReducer,
  outpassListReducer,
} from "./reducers/outpassReducers";
import { registerListReducer } from "./reducers/registerReducers";

const reducer = combineReducers({
  //contains all reducers
  userLogin: userLoginReducer,
  // userRegister: userRegisterReducer,
  outpassList: outpassListReducer,
  outpassCreate: outpassCreateReducer,
  registerList: registerListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
