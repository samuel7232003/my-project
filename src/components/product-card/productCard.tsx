import React from "react";
import css from "./productCard.module.css";
import { Product } from "../../context/productContext/productTypes";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function ProductCard(product: Product) {
  const navigate = useNavigate();
  const handleViewDetails = () => {
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