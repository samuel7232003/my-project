import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel, User } from "./user.state";

export const initialUserState: UserModel = {
    user: {
        userName: "",
        password: "",
        name: "",
        role: ""
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser_: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser_: (state) => {
            state.user = initialUserState.user;
        }
    }
})

export default userSlice;