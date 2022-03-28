import { createContext } from "react";

interface userInterface {
  loading: boolean;
  user: {
    email: string;
    watchlist: string[];
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string;
      watchlist: string[];
    }>
  >;
}

// context, which allows any component to access the user's data
export const UserContext = createContext<userInterface>({
  loading: false,
  user: {
    email: "",
    watchlist: [],
  },
  setUser: () => {},
});
