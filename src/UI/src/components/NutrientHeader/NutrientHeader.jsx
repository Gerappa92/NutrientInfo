import { Layout } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserSection } from "./UserSection";

const { Header } = Layout;

export const NutrientHeader = () => {
  return (
    <HeaderStyled>
      <Link to="/">
        <NutrientLogo>Nutrient Info</NutrientLogo>
      </Link>
      <RightSection>
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
`;
