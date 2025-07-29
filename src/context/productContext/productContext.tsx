import { ProductState, ProductAction } from "./productTypes";
import { createContext, useReducer, useContext } from "react";
import { productReducer } from "./productReducer";

const initialState: ProductState = {
  listProducts: [],
  error: null,
  loading: false,
};

type ContextType = {
  productState: ProductState;
  productDispatch: React.Dispatch<ProductAction>;
};

export const ProductContext = createContext<ContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [productState, productDispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ productState, productDispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
