import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import useAuth from "../Hooks/useAuth";
import { UserContext } from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, registerUser } = useAuth();
  const { user } = useContext(UserContext);

  // handles user registration via the useAuth custom hook
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setEmail("");
    setPassword("");

    registerUser(data);
  };
  // user gets redirected if they are already logged in
  if (user.email) {
    return <Navigate to={"/"} />;
  }

  return (
    <React.Fragment>
      <Container>
        <h1 className="display-4">Register</h1>
        <form onSubmit={(e) => register(e)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? "form-control is-invalid" : "form-control"}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "form-control is-invalid" : "form-control"}
          />
          <button type="submit" className="btn btn-outline-primary">
            Register
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </Container>
    </React.Fragment>
  );
}

export default Register;
