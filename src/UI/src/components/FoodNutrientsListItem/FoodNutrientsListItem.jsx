import { Card, Typography, Divider } from "antd";
import { useState } from "react";
import { BarChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BasicNutrientsTable } from "../NutrientsTable/BasicNutrientsTable";
import { VitaminsTable } from "../NutrientsTable/VitaminsTable";
import { OtherNutrientsTable } from "../NutrientsTable/OtherNutrientsTable";

const { Title, Text } = Typography;

export const FoodNutrientsListItem = ({ food }) => {
  const [tab, setTab] = useState("basic");

  const tabList = [
    {
      key: "basic",
      tab: "Basic",
    },
    {
      key: "vitamins",
      tab: "Vitamins",
    },
    {
      key: "else",
      tab: "Else",
    },
  ];

  const getSecondaryText = () => {
    let secondary = "";
    if (food.brandOwner) secondary = food.brandOwner;
    if (food.brandName) secondary += `- ${food.brandName}`;
    if (!food.brandOwner && !food.brandName) return food.dataSourceName;
    return secondary;
  };

  return (
    <>
      <Card
        tabList={tabList}
        style={{ width: "350px", margin: "10px" }}
        onTabChange={(key) => setTab(key)}
        actions={[
          <Link to={`/food-details/${food.id}`}>
            <BarChartOutlined key="food-details" />
          </Link>,
        ]}
      >
        <Title level={4}>{food.name}</Title>
        <Text type="secondary">{getSecondaryText()}</Text>

        <Divider />

        {tab === "basic" && <BasicNutrientsTable nutrients={food.nutrients} />}

        {tab === "vitamins" && <VitaminsTable nutrients={food.nutrients} />}

        {tab === "else" && <OtherNutrientsTable nutrients={food.nutrients} />}
      </Card>
    </>
  );
};
