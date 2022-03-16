import { Card, Divider } from "antd";
import { useState } from "react";
import { BarChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BasicNutrientsTable } from "../NutrientsTable/BasicNutrientsTable";
import { VitaminsTable } from "../NutrientsTable/VitaminsTable";
import { OtherNutrientsTable } from "../NutrientsTable/OtherNutrientsTable";
import { FoodHeader } from "../FoodHeader/FoodHeader";

export const FoodNutrientsCardItem = ({ food }) => {
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
        <FoodHeader food={food}></FoodHeader>

        <Divider />

        {tab === "basic" && <BasicNutrientsTable nutrients={food.nutrients} />}

        {tab === "vitamins" && <VitaminsTable nutrients={food.nutrients} />}

        {tab === "else" && <OtherNutrientsTable nutrients={food.nutrients} />}
      </Card>
    </>
  );
};
