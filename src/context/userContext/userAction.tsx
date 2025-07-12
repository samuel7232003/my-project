import { Dispatch } from "react";
import { UserAction } from "./userTypes";
import { serviceLogin, serviceSignup } from "../../service/account"; 

export const actionLogin = async (dispatch: Dispatch<UserAction>, username: string, password: string) => {
  try {
    const response = await serviceLogin(username, password);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || "Login failed.";
    dispatch({ type: "AUTH_ERROR", payload: errorMessage });
  }
};


export const actionSignup = async (dispatch: Dispatch<UserAction>, username: string, password: string, name: string) => {
  try {
    const response = await serviceSignup(username, password, name);
    dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || "Signup failed.";
    dispatch({ type: "AUTH_ERROR", payload: errorMessage });
  }
};

export const logout = (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: "LOGOUT" });
};
