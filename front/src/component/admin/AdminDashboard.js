import React, { useState } from "react";
import AddDish from "./AddDish";

const AdminDashboard = () => {
  const [dishes, setDishes] = useState([]);

  const handleDishAdded = (newDish) => {
    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <h1>Admin Dashboard</h1>
      <AddDish onDishAdded={handleDishAdded} />
    </div>
  );
};

export default AdminDashboard;
