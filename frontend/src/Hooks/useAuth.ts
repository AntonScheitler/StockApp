import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";

// custom hook, which handles user authentication
export default function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, SetError] = useState(false);

  // checks if the user's jwt is valid, updates userData and redirects the user
  const updateContext = async () => {
    // request to the backend to verify and decode the token
    const response = await axios.get("auth", {
      headers: {
        "x-access-token": sessionStorage.getItem("token") || "",
      },
    });
    if (response.data.auth === true) {
      setUser(response.data.user); // updates user data if token is valid
      navigate("/"); // redirects the user to the landing page
    } else {
      sessionStorage.clear();
      SetError(true);
    }
  };

  // registers and redirects the user
  const registerUser = async (userData: object) => {
    // request to the backend to save a new user in the database
    const response = await axios.post("register", userData);
    if (response.data.auth === true) {
      sessionStorage.setItem("token", response.data.token); // saves the jwt in session storage
      await updateContext(); // redirects user
    } else {
      SetError(true);
    }
  };

  // logs user in and redirects them
  const loginUser = async (userData: object) => {
    // request to the backend to check if the user exists/has the right password
    const response = await axios.post("login", userData);
    if (response.data.auth === true) {
      sessionStorage.setItem("token", response.data.token); // saves the jwt in session storage
      await updateContext();
    } else {
      SetError(true);
    }
  };

  // returns the functions to the register and login pages
  return {
    error: error,
    registerUser: registerUser,
    loginUser: loginUser,
  };
}
