import { Typography } from "antd";
import { MealForm } from "../../components/MealForm/MealForm";
import styled from "styled-components";
import { useState } from "react";

const { Title } = Typography;

const MealCreatorPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 5%;
`;

export const NewMealPage = () => {
  // const [meal, setMeal] = useState();
  // const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  // useEffect(() => {
  //   console.info(meal);
  //   postMeal();
  // }, [meal]);

  // const postMeal = () => {
  //   const url = `${apiBaseUrl}mealmaker`;
  //   axios.post(url, meal);
  // };

  return (
    <MealCreatorPageContainer>
      <Title>Meal Creator</Title>
      {/* <MealCreatorForm setMeal={setMeal}></MealCreatorForm> */}
      <MealForm></MealForm>
    </MealCreatorPageContainer>
  );
};
