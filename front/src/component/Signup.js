import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../image/caroseul/IMG-20240615-WA0007.jpg";

import axios from "axios";

const Signup = (onSignup) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    const newErrors = {};
    if (!nickname) newErrors.nickname = "Nickname is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://backend:8081/api/user/register",
        {
          email,
          nickname,
          password,
          roles: ["ROLE_USER"],
        }
      );
      localStorage.setItem("User-Signup-Data", response.data.nickname);
      console.log("User registered:", response.data);

      navigate("/login");
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

  const styles = {
    container: {
      width: "75%",
      backgroundColor: "#82620a",
      borderRadius: "8px",
      boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
    header: {
      borderBottom: "none",
      paddingBottom: "0",
      textAlign: "center",
      marginTop: "20px",
      justifyContent: "center",
    },
    input: {
      borderRadius: "4px",
    },
    button: {
      width: "100%",
      borderRadius: "4px",
      marginTop: "10px",
    },
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div
          className="container d-flex justify-content-center align-items-center "
          style={{ width: "30%", height: "85vh" }}
        >
          <div className="container p-4" style={styles.container}>
            <Modal.Header className="mt-3 mb-3 " style={styles.header}>
              <Modal.Title>User Sign up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="nickname">
                  <Form.Control
                    type="text"
                    placeholder="Nick name"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                  />
                  {errors.nickname && (
                    <div style={styles.errorText}>{errors.nickname}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && (
                    <div style={styles.errorText}>{errors.email}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && (
                    <div style={styles.errorText}>{errors.password}</div>
                  )}
                </Form.Group>

                <Button
                  variant="secondary"
                  type="submit"
                  style={{
                    fontSize: "20px",
                    background: "#5c460b",
                    borderRadius: "20px",
                  }}
                >
                  Sign up
                </Button>
              </Form>
            </Modal.Body>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
