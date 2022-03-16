import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spin } from "antd";
import { NutrientsTreeTable } from "../../components/NutrientsTable/NutrientsTreeTable";
import { NutrientPieChart } from "../../components/NutrientsChart/NutrientPieChart";
import { FoodTags } from "../../components/FoodTags/FoodTags";
import styled from "styled-components";
import "./FoodDetails.css";
import { FoodHeader } from "../../components/FoodHeader/FoodHeader";
import httpClient from "../../modules/axios-client";

const DetailsHeader = styled.div`
  padding: 10px;
`;

const FoodDetailsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: 50px;
`;

const FoodDetailsItems = styled.div`
  width: calc(100% / var(--col-divisor));
`;

export const FoodDetails = () => {
  const { foodId } = useParams();
  const [food, foodSet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      let response = await httpClient.get(`food/${foodId}`);
      foodSet(response.data);
      setLoading(false);
    })();
  }, [foodId]);

  return (
    <Spin style={{ marginTop: "10vh" }} spinning={loading} size="large">
      {!loading && (
        <>
          <DetailsHeader>
            <FoodHeader food={food}></FoodHeader>
          </DetailsHeader>
          <FoodTags tags={food.foodTags}></FoodTags>
          <FoodDetailsContainer>
            <FoodDetailsItems>
              <NutrientsTreeTable nutrients={food.nutrients} />
            </FoodDetailsItems>
            <FoodDetailsItems
              style={{ height: "calc(100vh / var(--chart-divisor))" }}
            >
              <NutrientPieChart nutrients={food.nutrients} />
            </FoodDetailsItems>
          </FoodDetailsContainer>
        </>
      )}
    </Spin>
  );
};
