import { Typography } from "antd";
import { MealCreatorForm } from "../../components/MealCreatorForm/MealCreatorForm";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const { Title } = Typography;

const MealCreatorPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20vw;
`;

export const MealCreatorPage = () => {
  const [meal, setMeal] = useState();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    console.info(meal);
    postMeal();
  }, [meal]);

  const postMeal = () => {
    const url = `${apiBaseUrl}mealmaker`;
    axios.post(url, meal);
  };

  return (
    <MealCreatorPageContainer>
      <Title>Meal Creator</Title>
      <MealCreatorForm setMeal={setMeal}></MealCreatorForm>
    </MealCreatorPageContainer>
  );
};
