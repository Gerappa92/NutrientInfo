import { Typography } from "antd";
import { MealCreatorForm } from "../../components/MealCreatorForm/MealCreatorForm";
import styled from "styled-components";

const { Title } = Typography;

const MealCreatorPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20vw;
`;

export const MealCreatorPage = () => {
  return (
    <MealCreatorPageContainer>
      <Title>Meal Creator</Title>
      <MealCreatorForm></MealCreatorForm>
    </MealCreatorPageContainer>
  );
};
