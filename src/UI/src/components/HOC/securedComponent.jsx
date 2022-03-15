import { useContext } from "react";
import { Unauthorized } from "../Unathorized/Unauthorized";
import { UserContext } from "../User/UserStateContainer/UserStateContainer";

export const securedComponent = (Component) => {
  return (props) => {
    const { isLogged } = useContext(UserContext);
    return <>{isLogged ? <Component {...props} /> : <Unauthorized />}</>;
  };
};
