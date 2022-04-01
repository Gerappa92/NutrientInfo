import { Spin, Typography } from "antd";
import { MealForm } from "../../components/Meal/MealForm";
import styled from "styled-components";
import { device } from "../../parameters/styles/media";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { MealNutrientsDetails } from "../../components/Meal/MealNutrientsDetails";
import { usePost } from "../../hooks/usePost";

const { Title } = Typography;

export const MealCalculatorPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [, isLoading, error, create] = usePost("meal/create", null, false);
  const history = useHistory();

  const onFinish = (values) => {
    create(values).then(() => history.push("/recipes"));
  };

  const onAddIngredient = (ingredients) => {
    setIngredients(ingredients);
  };

  return (
    <Container>
      <Title>Calculate nutrients</Title>
      <Content>
        <ContentItem>
          <Spin spinning={isLoading}>
            <MealForm onFinish={onFinish} onAddIngredient={onAddIngredient} />
            <ErrorMessage error={error} />
          </Spin>
        </ContentItem>
        <ContentItem>
          <MealNutrientsDetails ingredients={ingredients} />
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
