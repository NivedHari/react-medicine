import { useState, useEffect, useContext } from "react";
import MedicineList from "./MedicineList";
import MedicineDetails from "./InputForm/MedicineDetails";
import MedicineContext from "../store/medcine-context";

const MedicineManagement = () => {
  const medCtx = useContext(MedicineContext);
  const [medicines, setMedicines] = useState([]);

  const addMedicineHandler = (medicine) => {
    setMedicines((prevMedicines) => [...prevMedicines, medicine]);
  };

  return (
    <div>
      <MedicineDetails onAddMedicine={addMedicineHandler} />
      <MedicineList medicines={medCtx.medicines} />
    </div>
  );
};

export default MedicineManagement;
