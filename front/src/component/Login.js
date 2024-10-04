import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../image/caroseul/IMG-20240615-WA0007.jpg";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email format is valid
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/user/login",
        {
          email,
          password,
        }
      );
      onLogin(response.data.token);
      const catchedToken = response.data.token;
      const decodedToken = jwtDecode(catchedToken);
      localStorage.setItem("jwtToken", catchedToken);
      localStorage.setItem("userId", decodedToken.id);
      localStorage.setItem("nickname", decodedToken.nickname);
      localStorage.setItem("roles", decodedToken.roles.join(","));

      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // Incorrect password
          setError("Incorrect password. Please try again.");
        } else if (error.response.status === 404) {
          // Email not found
          setError("Email not found. Please check your email.");
        } else {
          // Other errors (e.g., server down, etc.)
          setError("An error occurred during login. Please try again later.");
        }
      } else {
        // If no response from the server
        setError("Network error. Please check your connection.");
      }
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
          style={{
            width: "30%",
            height: "85vh",
          }}
        >
          <div className="container p-4" style={styles.container}>
            <Modal.Header
              className="mt-3 mb-3 "
              style={styles.header}
            ></Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                {error && <div style={styles.errorText}>{error}</div>}
                <Form.Group
                  className="mb-3 overlay-content"
                  controlId="formBasicEmail"
                >
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
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="secondary"
                  type="submit"
                  onClick={handleSubmit}
                  style={{
                    fontSize: "20px",
                    background: "#5c460b",
                    borderRadius: "20px",
                  }}
                >
                  Login
                </Button>
              </Form>
            </Modal.Body>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
