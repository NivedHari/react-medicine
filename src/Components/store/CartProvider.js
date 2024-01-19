import { useContext, useEffect, useState } from "react";
import CartContext from "./cart-context";
import axios from "axios";

const CartProvider = (props) => {
  const api = 'https://crudcrud.com/api/04e03612b4474a0d8401297de71a1ab0/cart';
  const [items, updatedItems] = useState([]);
  const getItems = async () => {
    try {
      const response = await axios.get(
        `${api}`
      );

      updatedItems(response.data);
    } catch (error) {
      console.error("Error retrieving cart items:", error);
    }
  };
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      updatedItems(JSON.parse(storedItems));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItemToCartHandler = async (item) => {
    const updatedItemsArray = [...items];
    let url = `${api}`;
    const existingItemIndex = updatedItemsArray.findIndex(
      (existingItem) => existingItem.name === item.name
    );
    if (existingItemIndex !== -1) {
      updatedItemsArray[existingItemIndex].amount += Number(item.amount);

      try {
        const itemIdToUpdate = updatedItemsArray[existingItemIndex]._id;
        const updatedItem = {
          name: item.name,
          description: item.description,
          price: item.price,
          amount: updatedItemsArray[existingItemIndex].amount,
        };

        await axios.put(`${url}/${itemIdToUpdate}`, updatedItem);
        console.log(url);
        console.log(itemIdToUpdate);
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      try {
        const res = await axios.post(url, item);

        updatedItemsArray.push(res.data);
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }

    updatedItems(updatedItemsArray);
  };
  const removeItemFromCartHandler = async (id) => {
    const itemIndex = items.findIndex((item) => item._id === id);
    const existingItem = items[itemIndex];
    console.log(existingItem);
    if (itemIndex !== -1) {
      
      const updatedItemsArray = [...items];

      if (existingItem.amount > 1) {
        updatedItemsArray[itemIndex].amount -= 1;
        const updatedItem = {
          name: existingItem.name,
          description: existingItem.description,
          price: existingItem.price,
          amount: updatedItemsArray[itemIndex].amount,
        };
        try {
          const url = `${api}`;
          await axios.put(`${url}/${id}`, updatedItem);
          console.log(url);

          updatedItems(updatedItemsArray);
        } catch (error) {
          console.error("Error removing item:", error);
        }
      } else {
        updatedItemsArray.splice(itemIndex, 1);
        try {
          const url = `${api}/${id}`;
          await axios.delete(url);
          console.log(url);

          updatedItems(updatedItemsArray);
        } catch (error) {
          console.error("Error removing item:", error);
        }
      }
    }
  };
  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
