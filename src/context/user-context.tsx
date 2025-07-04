import { useReducer, useContext, createContext } from "react";

// 1. User Interface
interface User {
    userName: string;
    password: string;
    name: string;
    role: string;
}

// 2. State Type
interface userState {
    user: User | null;
}

// 3. Action Types
type userAction =
    | { type: "LOGIN"; payload: User }
    | { type: "LOGOUT" }
    | { type: "SIGNUP"; payload: User };

// 4. Context Type
interface UserContextType {
    state: userState;
    dispatch: React.Dispatch<userAction>;
}

// 5. Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// 6. Reducer Function
const userReducer = (state: userState, action: userAction): userState => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        case "SIGNUP":
            return { user: action.payload };
        default:
            return state;
    }
}

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(userReducer, { user: null });
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}