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
    clearWatchlist,
  };
}
