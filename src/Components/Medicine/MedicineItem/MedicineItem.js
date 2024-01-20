import { useContext, useState, useEffect } from "react";
import classes from "./MedicineItem.module.css";
import MedicineItemForm from "./MedicineItemForm";
import CartContext from "../../store/cart-context";
import MedicineContext from "../../store/medcine-context";

const MedicineItem = (props) => {
  const cartCtx = useContext(CartContext);
  const medCtx = useContext(MedicineContext);
  // const [quantity, setQuantity] = useState(props.quantity);
  // const price = `$${props.price.toFixed(2)}`;

  const cartItem = cartCtx.items.find((item) => item.id === props.id);

  const addToCartHandler = (amount) => {

    // setQuantity((prev) => prev - amount);

    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: +props.price,
    });
    props.onRemove(amount);
    console.log("Amount from medicine Item",amount);
  };

  return (
    <li className={classes.meds}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price} Rs</div>
        <div className={classes.amount}>
          Quantity Available: {props.quantity}
        </div>
      </div>
      <div>
      {props.quantity < 1 ? (
          <p>Out Of Stock</p>
        ) : (
        <MedicineItemForm
          onAddToCart={addToCartHandler}
          onAddAmount={props.onRemove}
          quantity={props.quantity}
        />)}
      </div>
    </li>
  );
};

export default MedicineItem;
