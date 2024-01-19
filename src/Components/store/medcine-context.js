import React, { createContext } from "react";

const MedicineContext = React.createContext({
  medicines: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default MedicineContext;
