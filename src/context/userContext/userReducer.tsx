import { UserState, UserAction } from "./userTypes";

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
        return { ...state, user: action.payload, error: null };
    case "SIGNUP_SUCCESS":
      return { ...state, user: action.payload, error: null };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
