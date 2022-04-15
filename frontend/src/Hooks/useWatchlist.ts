import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import useGetUser from "./useGetUser";

// custom hook which handles changes to the user's watchlist
export default function useWatchlist() {
  const { user, setUser } = useContext(UserContext);

  // adds a stock to the watchlist
  const addStock = async (newStock: string) => {
    // request to the backend to change the user's data
    const response = await axios.post("http://localhost:3001/addStock", {
      stock: newStock,
      token: sessionStorage.getItem("token"),
    });
    sessionStorage.setItem("token", response.data.token); // updates the jwt
    alert("stock added");
  };

  // removes a specific stock from the user's watchlist
  const removeStock = async (stock: string) => {
    const response = await axios.post("http://localhost:3001/removeStock", {
      stock: stock,
      token: sessionStorage.getItem("token"),
    });
    sessionStorage.setItem("token", response.data.token);
    setUser({
      ...user,
      watchlist: user.watchlist.filter((item) => item != stock),
    });
  };

  // clears the watchlist (doesn't trigger rerender yet)
  const clearWatchlist = async () => {
    // request to the backend to change the user's data
    const response = await axios.post("http://localhost:3001/clearWatchlist", {
      token: sessionStorage.getItem("token"),
    });
    sessionStorage.setItem("token", response.data.token); // updates the jwt
    setUser({
      ...user,
      watchlist: [],
    });
  };

  return {
    addStock,
    removeStock,
    clearWatchlist,
  };
}
