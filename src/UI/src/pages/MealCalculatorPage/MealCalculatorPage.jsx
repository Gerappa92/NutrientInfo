import { Typography } from "antd";
import { MealForm } from "../../components/Meal/MealForm";
import styled from "styled-components";
import { device } from "../../parameters/styles/media";
import { NutrientsTreeTable } from "../../components/NutrientsTable/NutrientsTreeTable";
import { NutrientPieChart } from "../../components/NutrientsChart/NutrientPieChart";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../../modules/axios-client";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const { Title } = Typography;

export const MealCalculatorPage = () => {
  const [nutrients, setNutrients] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  const onFinish = (values) => {
    httpClient
      .post("meal/create", values)
      .then(() => history.push("/recipes"))
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <Container>
      <Title>Calculate nutrients</Title>
      <Content>
        <ContentItem>
          <MealForm setNutrients={setNutrients} handleFinish={onFinish} />
          <ErrorMessage error={error} />
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
