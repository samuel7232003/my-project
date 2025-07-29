import React, { useEffect } from "react";
import css from "./Main.module.css";
import { ProductCard } from "../../components/product-card/productCard";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { serviceGetAllProducts } from "../../service/product";
import { actionGetAllProducts } from "../../redux/product/product.action";

export default function Main() {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionGetAllProducts());
  }, []);

  return (
    <div className={css.mainContainer}>
      <h1>Product List</h1>
      <div className={css.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
