import { Button, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../parameters/styles/media";
import { MealDetails } from "../../components/Meal/MealDetails";
import { MealForm } from "../../components/Meal/MealForm";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { MealNutrientsDetails } from "../../components/Meal/MealNutrientsDetails";

export const MealDetailsPage = () => {
  const { mealId } = useParams();
  const [meal, mealIsLoading, mealError, getMeal] = useGet(`/meal/${mealId}`);
  const [ingredients, setIngredients] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [, updateIsLoading, updateError, updateMeal] = usePost(
    "meal/update",
    null,
    false
  );

  useEffect(() => {
    if (meal && meal.ingredients) {
      setIngredients(meal.ingredients);
    }
  }, [meal]);

  const handleUpdateMeal = (values) => {
    updateMeal({ id: mealId, ...values }).then(() => {
      setIsEdit(false);
      getMeal();
    });
  };

  const onAddIngredient = (ingredients) => {
    setIngredients(ingredients);
  };

  return (
    <Container>
      <Spin spinning={mealIsLoading}>
        {meal && (
          <>
            <Typography.Title>{meal.name}</Typography.Title>
            <Content>
              <ContentItem>
                {isEdit ? (
                  <Spin spinning={updateIsLoading}>
                    <MealForm
                      submitButtonText="Update"
                      onFinish={handleUpdateMeal}
                      meal={meal}
                      onAddIngredient={onAddIngredient}
                    />
                    <ErrorMessage error={updateError} />
                  </Spin>
                ) : (
                  <MealDetails meal={meal} />
                )}
                <EditButton
                  type="primary"
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  {isEdit ? "Cancel" : "Edit"}
                </EditButton>
              </ContentItem>
              <ContentItem>
                <MealNutrientsDetails ingredients={ingredients} />
              </ContentItem>
            </Content>
          </>
        )}
        <ErrorMessage error={mealError} />
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
