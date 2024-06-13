import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import bcrypt from "bcryptjs";

const Signup = ({ onSignup }) => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const signupData = { email, password: hashedPassword };
      console.log("signupdata", signupData);
      // const signupData = { email, password };
      localStorage.setItem("User-Signup-Data", JSON.stringify(signupData));
      onSignup(signupData);
      handleClose();
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };
  // const handleSignup = () => {
  //   let signupInfo = localStorage.getItem("User-Signup-Data");
  //   onSignup(signupInfo);
  //   console.log("check what is onSignup", onSignup(signupInfo));
  //   handleClose();
  // };
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
