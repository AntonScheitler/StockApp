import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import useWatchlist from "../Hooks/useWatchlist";

// displays all the stocks, that the user has added to their watchlist
function Watchlist() {
  const { user, loading } = useContext(UserContext);
  const [watchlist, setWatchlist] = useState<any[]>([]);

  const { removeStock, clearWatchlist } = useWatchlist();

  // stock data gets updated upon mount
  useEffect(() => {
    // makes an api call to get the current price, etc of every stock in the watchlist
    const refreshWatchlist = async () => {
      const response = await axios.post("http://localhost:3001/stocks", {
        stocks: user.watchlist,
      });
      if (response.data.success === true) {
        setWatchlist(response.data.stocks);
      }
    };

    refreshWatchlist();
  }, [user.watchlist]);

  if (loading) {
    return <Loading />;
  }

  if (!user.email) {
    return <Navigate to="/login" />;
  }

  return (
    <React.Fragment>
      <Container className="d-flex justify-content-between">
        <h1 className="display-4">Watchlist</h1>
        <button
          className="btn btn-outline-danger"
          onClick={() => clearWatchlist()} // clears watchlist (doesn't trigger rerender yet)
        >
          Clear Watchlist
        </button>
      </Container>
      {watchlist.map((stock, index) => {
        // iterates through the watchlist
        return (
          <Container key={index} className="shadow p-3 mb-5 bg-light rounded">
            <h2>{stock.companyName}</h2>
            <h3>{stock.symbol}</h3>
            <h4>
              {stock.latestPrice} {stock.currency}
            </h4>
            <button
              className="btn btn-outline-danger"
              onClick={() => removeStock(stock.symbol)}
            >
              Delete from Watchlist
            </button>
          </Container>
        );
      })}
    </React.Fragment>
  );
}

export default Watchlist;
