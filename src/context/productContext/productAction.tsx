import React from "react";
import { ProductAction } from "./productTypes";
import { serviceGetAllProducts, serviceGetProductById } from "../../service/product";

export const getAllProducts = async (dispatch: React.Dispatch<ProductAction>) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
        const response = await serviceGetAllProducts();
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: response.data });
    } catch (error: any) {
        dispatch({ type: "FETCH_PRODUCTS_ERROR", payload: error.message });
    } finally {
        dispatch({ type: "SET_LOADING", payload: false });
    }
}

export const getProductById = async (dispatch: React.Dispatch<ProductAction>, id: number) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try{
        const response = await serviceGetProductById(id);
        dispatch({ type: "SET_PRODUCT_ID", payload: response.data });
    } catch (error: any) {
        dispatch({ type: "FETCH_PRODUCTS_ERROR", payload: error.message });
    } finally {
        dispatch({ type: "SET_LOADING", payload: false });
    }
}