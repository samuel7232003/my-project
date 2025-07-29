export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductState {
  listProducts: Product[];
  product?: Product;
  error: string | null;
  loading: boolean;
}

export type ProductAction =
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "FETCH_PRODUCTS_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PRODUCT_ID"; payload: any };
