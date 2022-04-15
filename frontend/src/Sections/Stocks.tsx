import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { UserContext } from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";
import useWatchlist from "../Hooks/useWatchlist";

interface stockDataInterface {
  companyName: string;
  currency: string;
  symbol: string;
  latestPrice: number;
}

// enables the user to search for a stock and add it to their watchlist
function Stocks() {
  const [symbolInput, setSymbolInput] = useState("");
  const [stockFound, setStockFound] = useState(true);
  const [stock, setStock] = useState<stockDataInterface>({
    companyName: "",
    currency: "",
    symbol: "",
    latestPrice: 0,
  });

  const { user, loading } = useContext(UserContext);

  const { addStock } = useWatchlist();

  // retrieves additional information on the requested stock
  const searchStock = async () => {
    const data = {
      stocks: [symbolInput.toUpperCase().replaceAll(" ", "")],
    };
    setSymbolInput("");
    const response = await axios.post(
      "https://generic-stock-app.herokuapp.com/stocks",
      data
    );

    if (response.data.success === true) {
      const { companyName, currency, symbol, latestPrice } =
        response.data.stocks[0];
      // state gets updated upon success
      setStock({
        companyName,
        currency,
        symbol,
        latestPrice,
      });
      setStockFound(true);
    } else {
      setStockFound(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // user gets redirected if they are not logged in
  if (!user.email) {
    return <Navigate to="/login" />;
  }

  return (
    <React.Fragment>
      <Container>
        <h1 className="display-4">Stock lookup</h1>
      </Container>
      <br />
      <br />
      <Container>
        <h4>Enter the symbol of a stock:</h4>
        <input
          type="text"
          placeholder="e.g aapl"
          className="form-control"
          value={symbolInput}
          onChange={(e) => {
            setSymbolInput(e.target.value);
          }}
        />
        <button
          onClick={() => searchStock()}
          className="btn btn-outline-primary"
        >
          Search
        </button>
      </Container>
      <br />
      {stockFound ? ( // stock gets displayed
        stock.symbol && (
          <Container className="shadow p-3 mb-5 bg-light rounded">
            <h2>{stock.companyName}</h2>
            <h3>{stock.symbol}</h3>
            <h4>
              {stock.latestPrice} {stock.currency}
            </h4>
            <button
              className="btn btn-outline-info"
              onClick={() => addStock(stock.symbol)}
            >
              Add {stock.companyName} to your watchlist
            </button>
          </Container>
        )
      ) : (
        <Container>
          <h2>Stock not found</h2>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Stocks;
