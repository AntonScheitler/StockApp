import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stocks from "./Sections/Stocks";
import NavComponent from "./Navigation/NavComponent";
import Watchlist from "./Sections/Watchlist";
import Login from "./Login/Login";
import Register from "./Login/Register";
import { UserContext } from "./Contexts/UserContext";
import useGetUser from "./Hooks/useGetUser";

// straps all other components together and provides the UserContext with user data
function App() {
  const { loading, user, setUser } = useGetUser();

  return (
    <UserContext.Provider value={{ loading, user, setUser }}>
      <React.Fragment>
        {user.email && <NavComponent />}
        <Router>
          <Routes>
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/" element={<Stocks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </React.Fragment>
    </UserContext.Provider>
  );
}

export default App;
