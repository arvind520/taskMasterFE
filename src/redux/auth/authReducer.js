import { LOGOUT, SIGN_IN } from "./authTypes";

//initial State
const initialState = {
  isLoggedIn: false,
  user: null,
};

//reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
