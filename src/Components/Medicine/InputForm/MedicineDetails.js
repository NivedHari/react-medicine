import { useState,useContext } from "react";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import classes from "./MedicineDetails.module.css";
import MedicineContext from "../../store/medcine-context";

const MedicineDetails = (props) => {
  const medCtx = useContext(MedicineContext);
  const [enteredName, setEnteredName] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const descriptionHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const priceHandler = (event) => {
    setEnteredPrice(event.target.value);
  };
  const quantityHandler = (event) => {
    setEnteredQuantity(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const medicine = {
      id: Math.random().toString(36),
      name: enteredName,
      description: enteredDescription,
      price: enteredPrice,
      quantity: enteredQuantity,
    };

    medCtx.addItem({
      name: enteredName,
      description: enteredDescription,
      price: +enteredPrice,
      quantity: +enteredQuantity,
    });
    // props.onAddMedicine(medicine);
    console.log(medicine);
    setEnteredName("");
    setEnteredDescription("");
    setEnteredPrice("");
    setEnteredQuantity("");
    console.log(medicine);
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={submitHandler}>
        <Input
          label="Medicine Name"
          id="name"
          type="text"
          value={enteredName}
          onChange={nameHandler}
        />
        <Input
          label="Description"
          id="description"
          type="text"
          value={enteredDescription}
          onChange={descriptionHandler}
        />
        <Input
          label="Price"
          id="price"
          type="number"
          value={enteredPrice}
          onChange={priceHandler}
        />
        <Input
          label="Quantity"
          id="quantity"
          type="number"
          value={enteredQuantity}
          onChange={quantityHandler}
        />
        <button type="submit">Add Product</button>
      </form>
    </Card>
  );
};

export default MedicineDetails;
