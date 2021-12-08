import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { PageHeader, Tag, Spin } from "antd";
import { NutrientsTreeTable } from "../../components/NutrientsTable/NutrientsTreeTable";
import { NutrientPieChart } from "../../components/NutrientsChart/NutrientPieChart";
import styled from "styled-components";
import "./FoodDetails.css";

const FoodDetailsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: 50px;
`;

const FoodDetailsItems = styled.div`
  width: calc(100% / var(--col-divisor));
`;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const FoodDetails = () => {
  const { foodId } = useParams();
  const [food, foodSet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      let response = await axios.get(`${apiBaseUrl}food/${foodId}`);
      foodSet(response.data);
      setLoading(false);
    })();
  }, [foodId]);

  const getTag = (tag) => {
    const color = getTagColor(tag.mark);
    return (
      <Tag key={tag.name} color={color}>
        {tag.name}
      </Tag>
    );
  };

  const getTagColor = (mark) => {
    switch (mark) {
      case "positive":
        return "green";
      case "negative":
        return "red";
      default:
        break;
    }
  };

  return (
    <Spin style={{ marginTop: "10vh" }} spinning={loading} size='large'>
      {!loading && (
        <PageHeader
          title={food.name}
          subTitle={food.brandName ?? food.dataSourceName}
          tags={food.foodTags.map((tag) => getTag(tag))}>
          <FoodDetailsContainer>
            <FoodDetailsItems>
              <NutrientsTreeTable nutrients={food.nutrients} />
            </FoodDetailsItems>
            <FoodDetailsItems
              style={{ height: "calc(100vh / var(--chart-divisor))" }}>
              <NutrientPieChart nutrients={food.nutrients} />
            </FoodDetailsItems>
          </FoodDetailsContainer>
        </PageHeader>
      )}
    </Spin>
  );
};
