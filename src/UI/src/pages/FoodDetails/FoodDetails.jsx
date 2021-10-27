import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { PageHeader, Tag, Table } from "antd";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const FoodDetails = () => {
  const { foodId } = useParams();
  const [food, foodSet] = useState({});

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value by 100g",
      dataIndex: "value",
      key: "value",
    },
  ];

  useEffect(() => {
    (async function fetchData() {
      let response = await axios.get(`${apiBaseUrl}food/${foodId}`);
      foodSet(response.data);
      console.log(response);
    })();
  }, [foodId]);

  const setValue = (food) => `${food.value} ${food.unitName.toLowerCase()}`;

  const mapNutrients = (food) => {
    return (
      food.nutrients &&
      food.nutrients.map((n, i) => ({
        key: i,
        name: n.name,
        value: setValue(n),
      }))
    );
  };

  return (
    <>
      <PageHeader
        title={food.name}
        subTitle={food.brandName && food.dataSourceName}
        tags={<Tag color="green">Good</Tag>}
      >
        <Table
          dataSource={mapNutrients(food)}
          columns={columns}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        ></Table>
        <p>{foodId}</p>
      </PageHeader>
    </>
  );
};
