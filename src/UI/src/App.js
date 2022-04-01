import React from "react";
import { UserStateContainer } from "./components/User/UserStateContainer/UserStateContainer";
import { MainLayout } from "./layout/MainLayout";

const App = () => {
  return (
    <UserStateContainer>
      <MainLayout />
    </UserStateContainer>
  );
};

export default App;
