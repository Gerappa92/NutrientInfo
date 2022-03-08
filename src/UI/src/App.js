import React, { useState } from "react";
import { LayoutSimple } from "./layout/Simple/LayoutSimple";

export const UserContext = React.createContext();

const defaultUser = {
  isLogged: false,
};

const App = () => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LayoutSimple></LayoutSimple>;
    </UserContext.Provider>
  );
};

export default App;
