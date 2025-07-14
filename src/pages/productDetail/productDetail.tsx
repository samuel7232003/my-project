import React, { use, useEffect, useState } from "react";
import { useProductContext } from "../../context/productContext/productContext";
import css from "./productDetail.module.css";
import { Button } from "antd";

export function ProductDetail() {
  const { productState } = useProductContext();
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(productState.product?.price || 0);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  useEffect(() => {
    if (productState.product) {
      setCost(productState.product.price * quantity);
    }
  }, [quantity, productState.product?.price]);

  return (
    <div className={css.productDetailContainer}>
      <h2 className={css.productTitle}>{productState.product?.title}</h2>
      <div className={css.productContent}>
        <div className={css.productLeft}>
          <figure className={css.productImage}>
            <img
              src={productState.product?.image}
              alt={productState.product?.title}
            />
          </figure>
          <p className={css.productPrice}>
            Price: {productState.product?.price}$
          </p>
          <p className={css.productCategory}>
            Category: {productState.product?.category}
          </p>
        </div>
        <div className={css.productRight}>
          <p className={css.productDescription}>
            {productState.product?.description}
          </p>
          <div className={css.productActionsContainer}>
            <div className={css.productActions}>
              <Button type="default" onClick={handleDecrement}>
                -
              </Button>
              <span>{quantity}</span>
              <Button type="default" onClick={handleIncrement}>
                +
              </Button>
            </div>
            <Button color="danger" variant="solid" className={css.addToCartButton}>
              Add to Cart ${cost}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
