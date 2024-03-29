import { ProductType } from "../context/ProductProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement } from "react";
type PropsType = {
  inCart: boolean;
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const Product = ({
  inCart,
  product,
  dispatch,
  REDUCER_ACTIONS,
}: PropsType): ReactElement => {
  const imagePath = `../assets/images/${product.sku}.jpg`;
  // console.log("Image Path:", imagePath);

  const baseURL = import.meta.url;
  // console.log("Base URL:", baseURL);

  const imgURL = new URL(imagePath, baseURL).href;
  // console.log("Final Image URL:", imgURL);

  const onAddToCart = () => {
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
  };

  const itemInCart = inCart ? ` added: ✔` : null;

  const content = (
    <article>
      <h3>{product.name}</h3>
      <img src={imgURL} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en", {
          style: "currency",
          currency: "NGN",
        }).format(product.price)}

        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  );
  return content;
};

export default Product;
