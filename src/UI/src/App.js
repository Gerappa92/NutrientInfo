import React, { useEffect, useState } from "react";
import { LayoutSimple } from "./layout/Simple/LayoutSimple";
import { isLoggedIn, refreshTokenInterval } from "./modules/user-module";

export const UserContext = React.createContext();

const defaultUser = {
  isLogged: false,
};

const App = () => {
  const [user, setUser] = useState(defaultUser);
  useEffect(() => {
    isLoggedIn().then((isLogged) => {
      setUser({ isLogged: isLogged });
      refreshTokenInterval();
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LayoutSimple></LayoutSimple>
    </UserContext.Provider>
  );
};

export default App;
