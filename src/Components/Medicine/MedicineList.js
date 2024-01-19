import MedicineItem from "./MedicineItem/MedicineItem";
import Card from "./../UI/Card";
import { useContext, useEffect } from "react";
import MedicineContext from "../store/medcine-context";

const MedicineList = (props) => {
  const removeMedicineHandler = (id) => {
    medCtx.removeItem(id);
  }
  const medCtx = useContext(MedicineContext);
  return (
    <Card>
      <h2>Medicine List</h2>
      <ul>
        {medCtx.medicines.map((medicine) => (
          <MedicineItem
            key={medicine.id}
            id={medicine.id}
            name={medicine.name}
            description={medicine.description}
            price={medicine.price}
            quantity={medicine.quantity}
            onRemove={() => removeMedicineHandler(medicine._id)}
          />
        ))}
      </ul>
    </Card>
  );
};

export default MedicineList;
