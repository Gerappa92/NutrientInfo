import { Button, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import httpClient from "../../modules/axios-client";
import { device } from "../../parameters/styles/media";
import { NutrientsTreeTable } from "../../components/NutrientsTable/NutrientsTreeTable";
import { NutrientPieChart } from "../../components/NutrientsChart/NutrientPieChart";
import { MealDetails } from "../../components/Meal/MealDetails";
import { MealForm } from "../../components/Meal/MealForm";
import { useGet } from "../../hooks/useGet";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const MealDetailsPage = () => {
  const { mealId } = useParams();
  const [nutrients, setNutrients] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [meal, isLoading, error] = useGet(`/meal/${mealId}`);

  useEffect(() => {
    console.log("meal", meal);
    if (meal && meal.ingredients) {
      httpClient
        .post("meal/calculate-nutrients", {
          ingredients: meal.ingredients,
        })
        .then((response) => setNutrients(response.data));
    }
  }, [meal]);

  const updateMeal = (values) => {
    httpClient.post("meal/update", { id: mealId, ...values });
  };

  return (
    <Container>
      <Spin spinning={isLoading}>
        {meal && (
          <>
            <Typography.Title>{meal.name}</Typography.Title>
            <Content>
              <ContentItem>
                {isEdit ? (
                  <MealForm
                    setNutrients={setNutrients}
                    meal={meal}
                    handleFinish={updateMeal}
                    submitButtonText="Update"
                  />
                ) : (
                  <MealDetails meal={meal} />
                )}
                <EditButton
                  hidden={isEdit}
                  type="primary"
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  Edit
                </EditButton>
              </ContentItem>
              <ContentItem>
                <Typography.Title level={4}>Nutrients Table</Typography.Title>
                <NutrientsTreeTable nutrients={nutrients} />
                <NutrientPieChart nutrients={nutrients} />
              </ContentItem>
            </Content>
          </>
        )}
        {error && <ErrorMessage error={error} />}
      </Spin>
    </Container>
  );
};

const EditButton = styled(Button)`
  width: 126px;
  margin: 10px 0;
`;

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
  margin-bottom: 25px;
  @media ${device.laptop} {
    margin: 0 1%;
    width: 48%;
  }
`;
