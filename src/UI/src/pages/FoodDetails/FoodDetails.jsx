import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { PageHeader, Tag, Spin } from "antd";
import { FoodNutrientsListItem } from "../../components/FoodNutrientsListItem/FoodNutrientsListItem";

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

  return (
    <>
      <Spin spinning={loading} size="large">
        {!loading && (
          <PageHeader
            title={food.name}
            subTitle={food.brandName ?? food.dataSourceName}
            tags={<Tag color="green">Good</Tag>}
          >
            <FoodNutrientsListItem food={food}></FoodNutrientsListItem>
          </PageHeader>
        )}
      </Spin>
    </>
  );
};
