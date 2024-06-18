import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import bcrypt from "bcryptjs";

const Login = ({ onLogin }) => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("user entered email", email);
    // console.log("user entered pass", password);
    const getUserData = localStorage.getItem("User-Signup-Data");

    let emailFromLocalStorage;
    const emailRegex = /"email"\s*:\s*"([^"]+)"/;
    const emailCatchFromLocal = getUserData.match(emailRegex);
    if (emailCatchFromLocal && emailCatchFromLocal.length > 1) {
      emailFromLocalStorage = emailCatchFromLocal[1];
    } else {
      console.log("Email address not found");
    }

    let passwordFromLocalStorage;
    const passwordRegex = /"password"\s*:\s*"([^"]+)"/;
    const passwordCatchFromLocal = getUserData.match(passwordRegex);

    if (passwordCatchFromLocal && passwordCatchFromLocal.length > 1) {
      passwordFromLocalStorage = passwordCatchFromLocal[1];
      console.log("password from local storage", passwordFromLocalStorage);
    } else {
      console.log("password  not found");
    }
    // console.log("email from local storage", emailFromLocalStorage);
    // console.log("password from local storage", passwordFromLocalStorage);
    // console.log("user data get from the local storage", getUserData);
    handleClose();
    const isPasswordCorrect = await bcrypt.compare(
      password,
      passwordFromLocalStorage
    );
    if (emailFromLocalStorage == email && isPasswordCorrect) {
      onLogin(email);

      // alert("user logged in ");
      localStorage.setItem("session", email);
    } else {
      alert("User name or passwork incorrect");
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ fontSize: "24px" }}
      >
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              Login
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

export default Login;
