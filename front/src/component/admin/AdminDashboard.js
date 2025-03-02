import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddDish from "./AddDish";
import MenuTable from "./MenuTable";
import UserDetails from "./UserDetails";
import AdminSidebar from "./AdminSidebar";
import OrderDetails from "./OrderDetails";
import CommentDetails from "./CommentDetails";

const AdminDashboard = () => {
  const [dishes, setDishes] = useState([]);

  const handleDishAdded = (newDish) => {
    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  return (
    <div style={{ display: "flex", marginTop: "150px" }}>
      <AdminSidebar />
      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <Routes>
          <Route path="/" element={<Navigate to="menu-details" replace />} />
          <Route
            path="menu-details"
            element={
              <>
                <AddDish onDishAdded={handleDishAdded} />
                <MenuTable dishes={dishes} setDishes={setDishes} />
              </>
            }
          />
          <Route path="user-details" element={<UserDetails />} />

          <Route path="order-details" element={<OrderDetails />} />
          <Route path="comment-details" element={<CommentDetails />} />
        </Routes>
      </div>
    </div>
    // <div style={{ marginTop: "150px" }}>
    //   <AdminSidebar />
    //   <div>
    //     {" "}
    //     <h1>Admin Dashboard</h1>
    //     <AddDish onDishAdded={handleDishAdded} />
    //   </div>
    //   <div>
    //     <MenuTable dishes={dishes} setDishes={setDishes} />
    //   </div>
    // </div>
  );
};

export default AdminDashboard;
