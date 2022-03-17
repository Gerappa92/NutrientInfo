import { Layout } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../User/UserStateContainer/UserStateContainer";
import { UserSection } from "./UserSection";

const { Header } = Layout;

export const NutrientHeader = () => {
  const userContext = useContext(UserContext);
  return (
    <HeaderStyled>
      <Link to="/">
        <NutrientLogo>Nutrient Info</NutrientLogo>
      </Link>
      <RightSection>
        {userContext.isLogged && (
          <Link to="/meal-creator">
            <HeaderButton>Calculator</HeaderButton>
          </Link>
        )}
        <UserSection />
      </RightSection>
    </HeaderStyled>
  );
};

const HeaderStyled = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const NutrientLogo = styled.div`
  padding: 0 20px;
  font-family: "Kaushan Script", cursive;
  font-size: x-large;
  color: #fff;
  width: -webkit-fill-available;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderButton = styled.p`
  color: white;
  margin: 0 10px;
  cursor: pointer;
`;
