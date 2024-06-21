import React, { useState } from "react";
import AddDish from "./AddDish";
import MenuTable from "./MenuTable";

const AdminDashboard = () => {
  const [dishes, setDishes] = useState([]);

  const handleDishAdded = (newDish) => {
    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div>
        {" "}
        <h1>Admin Dashboard</h1>
        <AddDish onDishAdded={handleDishAdded} />
      </div>
      <div>
        <MenuTable dishes={dishes} setDishes={setDishes} />
      </div>
    </div>
  );
};

export default AdminDashboard;
