import React, { useEffect, useState } from "react";
import { isLoggedIn, login, logout } from "../../../modules/user-module";

export const UserContext = React.createContext();

const defaultUser = {
  isLogged: false,
};

export const UserStateContainer = (props) => {
  const [user, setUser] = useState(defaultUser);
  useEffect(() => {
    isLoggedIn().then((isLogged) => {
      setUser({ isLogged: isLogged });
    });
  }, []);

  const handleLogin = async (credentials) => {
    await login(credentials).then(() => {
      setUser({ isLogged: true });
    });
  };

  const handleLogout = () => {
    setUser({ isLogged: false });
    logout();
  };

  return (
    <>
      <UserContext.Provider
        value={{ isLogged: user.isLogged, handleLogin, handleLogout }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};
