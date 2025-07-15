import { ProductState, ProductAction } from "./productTypes";

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, listProducts: action.payload, loading: false, error: null };
    case "FETCH_PRODUCTS_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PRODUCT_ID":
      return { ...state, product: action.payload };
    default:
      return state;
  }
};
