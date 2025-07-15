import { get } from "http";
import React, { useEffect } from "react";
import css from "./Main.module.css";
import { useProductContext } from "../../context/productContext/productContext";
import { getAllProducts } from "../../context/productContext/productAction";
import { ProductCard } from "../../components/product-card/productCard";

export default function Main() {
  const { productState, productDispatch } = useProductContext();
  useEffect(() => {
    getAllProducts(productDispatch);
  }, []);

  return (
    <div className={css.mainContainer}>
      <h1>Product List</h1>
      {productState.loading === true ? <p>Loading...</p> : <div className={css.productList}>
        {productState.listProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>}
      {productState.error && <p>Error: {productState.error}</p>}
      
    </div>
  );
}
