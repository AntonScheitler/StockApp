import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../Hooks/useAuth";
import { UserContext } from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loginUser } = useAuth();
  const { user } = useContext(UserContext);

  // logs the user in via the useAuth custom hook
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { email: email, password: password };
    setEmail("");
    setPassword("");

    loginUser(data);
  };

  // redirects the user if they are already logged in
  if (user.email) {
    return <Navigate to={"/"} />;
  }

  return (
    <React.Fragment>
      <Container>
        <h1 className="display-4">Login</h1>
        <form
          onSubmit={(e) => {
            login(e);
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={error ? "form-control is-invalid" : "form-control"}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={error ? "form-control is-invalid" : "form-control"}
          />
          <button type="submit" className="btn btn-outline-primary">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </Container>
    </React.Fragment>
  );
}

export default Login;
