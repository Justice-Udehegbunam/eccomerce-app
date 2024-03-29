import React, { ChangeEvent, ReactElement } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const imagePath = `../assets/images/${item.sku}.jpg`;
  // console.log("Image Path:", imagePath);

  const baseURL = import.meta.url;
  // console.log("Base URL:", baseURL);

  const imgURL = new URL(imagePath, baseURL).href;
  // console.log("Final Image URL:", imgURL);

  const lineTotal: number = item.qty * item.price;

  const highestQuantity: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highestQuantity).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart__item">
      <img src={imgURL} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("en", {
          style: "currency",
          currency: "NGN",
        }).format(item.price)}
      </div>

      <label htmlFor="ItemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="ItemQty"
        id="ItemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en", {
          style: "currency",
          currency: "NGN",
        }).format(lineTotal)}
      </div>

      <button
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );

  return content;
};

export default CartLineItem;
