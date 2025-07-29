import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductModel } from "./product.state";

export const initialProductState: ProductModel = {
    product: {
        id: 0,
        title: "",
        price: 0,
        description: "",
        category: "",
        image: ""
    },
    products: []
}

const productSlice = createSlice({
    name: "product",
    initialState: initialProductState,
    reducers: {
        setProduct_: (state, action: PayloadAction<Product>) => {
            state.product = action.payload;
        },
        setProducts_: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        clearProduct_: (state) => {
            state.product = initialProductState.product;
            state.products = [];
        }
    }
})

export default productSlice;