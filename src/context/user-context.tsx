import { useReducer, useContext, createContext } from "react";

// 1. User Interface
interface User {
  userName: string;
  password: string;
  name: string;
  role: string;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

// 2. Initial State
const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

type UserAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SIGNUP"; payload: User };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, user: null, isLoggedIn: false };
    case "SIGNUP":
      return { ...state, user: action.payload, isLoggedIn: true };
    default:
      return state;
  }
};

// 3. Reducer Function
export interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

// 4. Create Context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// 5. Custom Hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
