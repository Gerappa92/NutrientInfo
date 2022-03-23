import { Layout, Tag } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../User/UserStateContainer/UserStateContainer";
import { UserSection } from "./UserSection";
import { CalcflowerIcon } from "../Icons/CalcflowerIcon";

const { Header } = Layout;

export const NutrientHeader = () => {
  const userContext = useContext(UserContext);
  return (
    <HeaderStyled>
      <Link to="/">
        <LogoDiv>
          <CalcflowerIcon width={50} />
          <Logo>Calcflower</Logo>
          <LogoTag color="purple">Beta</LogoTag>
        </LogoDiv>
      </Link>
      <RightSection>
        {userContext.isLogged && (
          <Link to="/meal-creator">
            <HeaderButton>Calculator</HeaderButton>
          </Link>
        )}
        {userContext.isLogged && (
          <Link to="/recipes">
            <HeaderButton>Recipes</HeaderButton>
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

const LogoDiv = styled.div`
  position: relative;
  display: flex;
`;

const Logo = styled.div`
  padding: 0 0px;
  font-family: "Kaushan Script", cursive;
  font-size: x-large;
  color: #fff;
  width: -webkit-fill-available;
`;

const LogoTag = styled(Tag)`
  position: absolute;
  top: 10px;
  right: -30px;
  cursor: default;
  border: none;
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
