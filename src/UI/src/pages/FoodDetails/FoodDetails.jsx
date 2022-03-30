import { useParams } from "react-router";
import { Spin } from "antd";
import { NutrientsTreeTable } from "../../components/NutrientsTable/NutrientsTreeTable";
import { NutrientPieChart } from "../../components/NutrientsChart/NutrientPieChart";
import { FoodTags } from "../../components/FoodTags/FoodTags";
import styled from "styled-components";
import { FoodHeader } from "../../components/FoodHeader/FoodHeader";
import { device } from "../../parameters/styles/media";
import { useGet } from "../../hooks/useGet";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const FoodDetails = () => {
  const { foodId } = useParams();
  const [data, isLoading, error] = useGet(`food/${foodId}`);

  return (
    <Spin style={{ marginTop: "10vh" }} spinning={isLoading} size="large">
      {data && (
        <>
          <DetailsHeader>
            <FoodHeader food={data} titleLevel={3}></FoodHeader>
          </DetailsHeader>
          <FoodTags tags={data.foodTags}></FoodTags>
          <FoodDetailsContainer>
            <FoodDetailsItems>
              <NutrientsTreeTable nutrients={data.nutrients} />
            </FoodDetailsItems>
            <FoodDetailsItems
              style={{ height: "calc(100vh / var(--chart-divisor))" }}
            >
              <NutrientPieChart nutrients={data.nutrients} />
            </FoodDetailsItems>
          </FoodDetailsContainer>
        </>
      )}
      {error && <ErrorMessage error={error} />}
    </Spin>
  );
};

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
  width: 100%;
  @media ${device.laptop} {
    width: 50%;
  }
`;
