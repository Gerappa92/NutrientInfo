import React from "react";
import { UserStateContainer } from "./components/User/UserStateContainer/UserStateContainer";
import { LayoutSimple } from "./layout/Simple/LayoutSimple";

const App = () => {
  return (
    <UserStateContainer>
      <LayoutSimple></LayoutSimple>
    </UserStateContainer>
  );
};

export default App;
