export interface User {
  userName: string;
  password: string;
  name: string;
  role: string;
}

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  error: string | null;
}

export type UserAction =
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "SIGNUP_SUCCESS"; payload: User }
  | { type: "LOGOUT" }
  | { type: "AUTH_ERROR"; payload: string };