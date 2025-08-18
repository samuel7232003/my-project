import { useEffect, useState } from "react";
import css from "./productDetail.module.css";
import { Button } from "antd";
import { useParams } from "react-router";
import { useAppSelector, useAppDispatch } from "../../redux/builder";
import { actionGetProductById } from "../../redux/product/product.action";

export function ProductDetail() {
  const product = useAppSelector((state) => state.product.product);
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(product?.price || 0);
  const { id } = useParams();

  const fetchProduct = async () => {
    if (!id) return;
    dispatch(actionGetProductById(parseInt(id)));
  };

  useEffect(() => {
    fetchProduct();
  }, [id, dispatch]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  useEffect(() => {
    if (product) {
      setCost(product.price * quantity);
    }
  }, [quantity, product?.price]);

  return (
    <div className={css.productDetailContainer}>
      <h2 className={css.productTitle}>{product?.title}</h2>

      <div className={css.productContent}>
        <div className={css.productLeft}>
          <figure className={css.productImage}>
            <img src={product?.image} alt={product?.title} />
          </figure>
          <p className={css.productPrice}>Price: {product?.price}$</p>
          <p className={css.productCategory}>Category: {product?.category}</p>
        </div>
        <div className={css.productRight}>
          <p className={css.productDescription}>{product?.description}</p>
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
            <Button
              color="danger"
              variant="solid"
              className={css.addToCartButton}
            >
              Add to Cart ${cost.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
