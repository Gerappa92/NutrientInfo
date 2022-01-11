import { Layout } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderStyled = styled(Header)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NutrientLogo = styled.div`
  padding: 0 20px;
  font-family: "Kaushan Script", cursive;
  font-size: x-large;
  color: #fff;
  width: -webkit-fill-available;
`;

export const NutrientHeader = () => {
  return (
    <HeaderStyled>
      <Link to="/">
        <NutrientLogo>Nutrient Info</NutrientLogo>
      </Link>
    </HeaderStyled>
  );
};
