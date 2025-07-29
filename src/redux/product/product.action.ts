import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import productSlice from "./product.slice";
import { RootState } from "../store";
import { serviceGetAllProducts, serviceGetProductById } from "../../service/product";

export const productActions = productSlice.actions;

export const actionGetAllProducts = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        const response = await serviceGetAllProducts();
        dispatch(productActions.setProducts_(response.data));
    }
}

export const actionGetProductById = (id: number): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        const response = await serviceGetProductById(id);
        dispatch(productActions.setProduct_(response.data));
    }
}