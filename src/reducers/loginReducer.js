import { LOGIN_USER } from "../actions/types";
let initialState = {
  user_info: null,
  login_status: false,
};
const loginReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOGIN_USER:
      newState.user_info = action.payload;
      newState.login_status = true;
      break;
    default:
      return newState;
  }

  return newState;
};
export default loginReducer;
