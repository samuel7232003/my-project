import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";
import productSlice from "./product/product.slice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch