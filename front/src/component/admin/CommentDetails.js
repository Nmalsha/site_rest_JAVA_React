import React, { useEffect, useState } from "react";

import { Table} from "react-bootstrap";
import axios from "axios";


const CommentDetails = () => {
const [Comments, setComments] = useState([]);
useEffect(() => {
  const fetchComments = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get("http://localhost:8081/api/comment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(response.data);
      console.error("fetching users:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchComments();
}, [setComments]);

return (
  <div style={{ height: "100vh" }}>
    <h2>Comments List</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Content </th>
          <th>Menu ID</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(Comments) &&
          Comments.map((Comment) => (
            <tr key={Comment.id}>
              <td>{Comment.id}</td>
              <td>{Comment.content}</td>
              <td>{Comment.menu_id}</td>
              <td>{Comment.user_id}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  </div>
);

};
export default CommentDetails;
