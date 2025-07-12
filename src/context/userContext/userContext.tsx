import { createContext, useReducer, ReactNode, useContext } from "react";
import { userReducer } from "./userReducer";
import { UserState, UserAction } from "./userTypes";

const initialState: UserState = {
  user: null,
  error: null,
};

type ContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
};

export const UserContext = createContext<ContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used inside UserProvider");
  return context;
};
