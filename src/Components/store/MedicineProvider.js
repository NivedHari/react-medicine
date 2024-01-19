import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MedicineContext from "./medcine-context";

const MedicineProvider = (props) => {
  const [medicines, updatedMedicines] = useState([]);

  const api = 'https://crudcrud.com/api/04e03612b4474a0d8401297de71a1ab0/medicine';

  const getMedicines = async () => {
    try {
      const response = await axios.get(
        `${api}`
      );

      updatedMedicines(response.data);
    } catch (error) {
      console.error("Error retrieving medicine items:", error);
    }
  };
  useEffect(() => {
    const storedMedicines = localStorage.getItem("medicines");
    if (storedMedicines) {
      updatedMedicines(JSON.parse(storedMedicines));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  const addMedicineHandler = async (item) => {
    const updatedMedicinesArray = [...medicines];
    let url = `${api}`;
    const existingItemIndex = updatedMedicinesArray.findIndex(
      (existingItem) => existingItem._id === item.id
    );
    if (existingItemIndex !== -1) {
      updatedMedicinesArray[existingItemIndex].amount += Number(item.amount);

      try {
        const itemIdToUpdate = updatedMedicinesArray[existingItemIndex]._id;
        const updatedItem = {
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: updatedMedicinesArray[existingItemIndex].quantity,
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

        updatedMedicinesArray.push(res.data);
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }

    updatedMedicines(updatedMedicinesArray);
  };

  const removeMedicineHandler = async (id) => {
    const itemIndex = medicines.findIndex((item) => item._id === id);
    const existingItem = medicines[itemIndex];
    console.log(existingItem);
    if (itemIndex !== -1) {
      const updatedMedicinesArray = [...medicines];

      if (existingItem.quantity > 1) {
        updatedMedicinesArray[itemIndex].quantity -= 1;
        const updatedItem = {
          name: existingItem.name,
          description: existingItem.description,
          price: existingItem.price,
          quantity: updatedMedicinesArray[itemIndex].quantity,
        };
        try {
          const url = `${api}`;
          await axios.put(`${url}/${id}`, updatedItem);
          console.log(url);

          updatedMedicines(updatedMedicinesArray);
        } catch (error) {
          console.error("Error removing item:", error);
        }
      } else {
        updatedMedicinesArray.splice(itemIndex, 1);
        try {
          const url = `${api}/${id}`;
          await axios.delete(url);
          console.log(url);

          updatedMedicines(updatedMedicinesArray);
        } catch (error) {
          console.error("Error removing item:", error);
        }
      }
    }
  };
  const medicineContext = {
    medicines: medicines,
    addItem: addMedicineHandler,
    removeItem: removeMedicineHandler,
  };
  return (
    <MedicineContext.Provider value={medicineContext}>
      {props.children}
    </MedicineContext.Provider>
  );
};

export default MedicineProvider;
