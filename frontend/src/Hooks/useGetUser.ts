import { useState, useEffect } from "react";
import axios from "axios";

interface userInterface {
  email: string;
  watchlist: string[];
}

// custom hook, which authenticates the user on every mount
export default function useGetUser() {
  const [user, setUser] = useState<userInterface>({
    email: "",
    watchlist: [],
  });
  const [loading, setLoading] = useState(true);

  // verifys the user's jwt and updates the context
  const getUser = async () => {
    // request to the backend to verify and decode the token
    const response = await axios.get("http://localhost:3001/auth", {
      headers: {
        "x-access-token": sessionStorage.getItem("token") || "",
      },
    });
    if (response.data.auth === true) {
      setUser(response.data.user); // state gets updated of the token is valid
      setLoading(false);
    } else {
      sessionStorage.clear();
      setLoading(false);
    }
  };

  // verifys the token on every mount
  useEffect(() => {
    getUser();
  }, []);

  // these variables and functions can be accessed globally via useContext
  return {
    loading,
    user,
    setUser,
  };
}
