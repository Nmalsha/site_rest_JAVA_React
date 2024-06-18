import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import axios from "axios";

const Signup = ({ onSignup }) => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [roles, setRoles] = useState(["ROLE_USER"]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/user/register",
        {
          email,
          nickname,
          password,
          roles,
        }
      );
      localStorage.setItem("User-Signup-Data", response.data.nickname);
      console.log("User registered:", response.data);
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);
      // const signupData = { nickname, email, password: hashedPassword };
      // console.log("signupdata", signupData);
      // const signupData = { email, password };
      // localStorage.setItem("User-Signup-Data", JSON.stringify(signupData));
      // onSignup(signupData);
      handleClose();
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ fontSize: "24px" }}
      >
        Sign up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Nick Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nick name"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="secondary" type="submit" onClick={handleSubmit}>
              Sign up
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Signup;
