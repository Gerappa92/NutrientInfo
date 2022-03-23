import { Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import httpClient from "../../modules/axios-client";
import { device } from "../../parameters/styles/media";
import { NutrientsTreeTable } from "../../components/NutrientsTable/NutrientsTreeTable";
import { NutrientPieChart } from "../../components/NutrientsChart/NutrientPieChart";
import { MealDetails } from "../../components/Meal/MealDetails";

export const MealDetailsPage = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState({});
  const [nutrients, setNutrients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    httpClient
      .get(`/meal/${mealId}`)
      .then((response) => {
        setMeal(response.data);
        return httpClient.post("meal/calculate-nutrients", {
          ingredients: response.data.ingredients,
        });
      })
      .then((response) => setNutrients(response.data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [mealId]);

  return (
    <Container>
      <Typography.Title>{meal.name}</Typography.Title>
      <Spin spinning={isLoading}>
        <Content>
          <ContentItem>
            <MealDetails meal={meal} />
          </ContentItem>
          <ContentItem>
            <NutrientsTreeTable nutrients={nutrients} />
            <NutrientPieChart nutrients={nutrients} />
          </ContentItem>
        </Content>
      </Spin>
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
