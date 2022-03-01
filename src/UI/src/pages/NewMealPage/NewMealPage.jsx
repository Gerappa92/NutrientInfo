import { Typography } from "antd";
import { MealForm } from "../../components/MealForm/MealForm";
import styled from "styled-components";

const { Title } = Typography;

const MealCreatorPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 5%;
`;

export const NewMealPage = () => {
  return (
    <MealCreatorPageContainer>
      <Title>Meal Creator</Title>
      <MealForm />
    </MealCreatorPageContainer>
  );
};
