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
  const [refreshed, setRefreshed] = useState(false);
  const [watchlist, setWatchlist] = useState<any[]>([]);

  const { clearWatchlist } = useWatchlist();

  // makes an api call for every stock in the watchlist, to get their current price, etc.
  const refreshWatchlist = async () => {
    const response = await axios.post("http://localhost:3001/stocks", {
      stocks: user.watchlist,
    });
    if (response.data.success === true) {
      setWatchlist(response.data.stocks);
    }
    setRefreshed(true);
  };

  // stock data gets updated periodically
  useEffect(() => {
    const id = setInterval(() => refreshWatchlist(), 60000);
    return () => clearInterval(id);
  });

  if (loading || !refreshed) {
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
          </Container>
        );
      })}
    </React.Fragment>
  );
}

export default Watchlist;
