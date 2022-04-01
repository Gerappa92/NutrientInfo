import { Typography, Spin } from "antd";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { NutrientPieChart } from "../NutrientsChart/NutrientPieChart";
import { NutrientsTreeTable } from "../NutrientsTable/NutrientsTreeTable";
import { usePost } from "../../hooks/usePost";
import { useEffect } from "react";

export const MealNutrientsDetails = ({ ingredients }) => {
  const [nutrients, nutrientsIsLoading, nutrientsError, calcNutrients] =
    usePost("meal/calculate-nutrients", null, false);

  useEffect(() => {
    calcNutrients({ ingredients: ingredients });
  }, [calcNutrients, ingredients]);

  return (
    <>
      <Typography.Title level={4}>Nutrients Table</Typography.Title>
      <Spin spinning={nutrientsIsLoading}>
        {nutrientsError ? (
          <ErrorMessage error={nutrientsError} />
        ) : (
          <>
            <NutrientsTreeTable nutrients={nutrients} />
            <NutrientPieChart nutrients={nutrients} />
          </>
        )}
      </Spin>
    </>
  );
};
