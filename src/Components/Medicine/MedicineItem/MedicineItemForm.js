import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MedicineItemForm.module.css";

const MedicineItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    console.log(enteredAmountNumber);

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 20
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        id="amount"
        type="number"
        min="1"
        max="50"
        step="1"
        defaultValue="1"
      />
      <button >Add To Cart</button>
      {!amountIsValid && <p>Enter Valid Amount</p>}
    </form>
  );
};

export default MedicineItemForm;
