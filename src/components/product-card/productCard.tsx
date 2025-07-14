import React from "react";
import css from "./productCard.module.css";
import { Product } from "../../context/productContext/productTypes";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../../context/productContext/productAction";
import { useProductContext } from "../../context/productContext/productContext";

export function ProductCard(product: Product) {
  const navigate = useNavigate();
  const { productState, productDispatch } = useProductContext();
  const handleViewDetails = () => {
    getProductById(productDispatch, product.id);
    navigate(`/products/${product.id}`);
  };
  return (
    <div className={css.productCard}>
      <figure><img src={product.image} alt="Product Image" /></figure>
      <h3 className={css.productTitle}>{product.title}</h3>
      <div className={css.productDetails}>
        <p className={css.productPrice}>{product.price}$</p>
        <Button type="primary" className={css.productDetail} onClick={handleViewDetails}>View Details</Button>
      </div>
      
    </div>
  );
}