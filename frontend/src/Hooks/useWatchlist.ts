import axios from "axios";

// custom hook which handles changes to the user's watchlist
export default function useWatchlist() {
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
    // TODO update UserContext and trigger rerender
  };

  // clears the watchlist (doesn't trigger rerender yet)
  const clearWatchlist = async () => {
    // request to the backend to change the user's data
    const response = await axios.post("http://localhost:3001/clearWatchlist", {
      token: sessionStorage.getItem("token"),
    });
    sessionStorage.setItem("token", response.data.token); // updates the jwt
    //TODO update userContext and trigger rerender?
  };

  return {
    addStock,
    removeStock,
    clearWatchlist,
  };
}
