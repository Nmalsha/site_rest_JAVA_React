import React, { useEffect, useState } from "react";

import { Table, Button } from "react-bootstrap";
import axios from "axios";

const UserDetails = () => {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const response = await axios.get("http://localhost:8081/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        console.error("fetching users:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [setUsers]);

  return (
    <div style={{ height: "100vh" }}>
      <h2>Users List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(Users) &&
            Users.map((dish) => (
              <tr key={dish.id}>
                <td>{dish.id}</td>
                <td>{dish.nickname}</td>
                <td>{dish.email}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserDetails;
