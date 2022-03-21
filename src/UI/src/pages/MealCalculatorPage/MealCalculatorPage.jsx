import { Typography } from "antd";
import { MealForm } from "../../components/MealCalculator/MealForm";
import styled from "styled-components";
import { device } from "../../parameters/styles/media";
import { NutrientsTreeTable } from "../../components/NutrientsTable/NutrientsTreeTable";
import { NutrientPieChart } from "../../components/NutrientsChart/NutrientPieChart";
import { useState } from "react";

const { Title } = Typography;

export const MealCalculatorPage = () => {
  const [nutrients, setNutrients] = useState([]);

  return (
    <Container>
      <Title>Meal Creator</Title>
      <Content>
        <ContentItem>
          <MealForm setNutrients={setNutrients} />
        </ContentItem>
        <ContentItem>
          <NutrientsTreeTable nutrients={nutrients} />
          <NutrientPieChart nutrients={nutrients} />
        </ContentItem>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 5%;
`;

const Content = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: 50px;
`;

const ContentItem = styled.div`
  width: 100%;
  @media ${device.laptop} {
    margin: 0 1%;
    width: 48%;
  }
`;
