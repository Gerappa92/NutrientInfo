import { Table, Card, Typography, Divider } from "antd";
import { useState } from "react";
import { BarChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export const FoodNutrientsListItem = ({ food }) => {
  const [tab, setTab] = useState("basic");

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

  const bacisNutrientsIds = [
    "208", //Energy
    "203", //Protein
    "205", //Carbohydrates
    "269", //Sugar
    "291", //Fiber
    "307", //Sodium 2.54x Salt
  ];

  const fatId = "204"; //Fat

  const fattyAcidsIds = [
    "605", //Fatty acids, total trans
    "606", //Fatty acids, total saturated
    "645", //Fatty acids, total monounsaturated
    "646", //Fatty acids, total polyunsaturated
  ];

  const setValue = (food) => `${food.value} ${food.unitName.toLowerCase()}`;

  const getBasicNutrients = (nutrients) => {
    let basic = nutrients
      .filter((n) => bacisNutrientsIds.includes(n.id))
      .map((n, i) => ({
        key: i,
        name: n.name,
        value: setValue(n),
      }));
    let fat = getFats(nutrients);
    if (fat) {
      basic.push(fat);
    }
    return basic;
  };

  const getFats = (nutrients) => {
    let fat = nutrients.find((n) => n.id === fatId);
    if (!fat) {
      return null;
    }
    let fattyAcids = nutrients
      .filter((n) => fattyAcidsIds.includes(n.id))
      .map((n) => ({
        name: n.name,
        value: setValue(n),
      }));
    return {
      name: fat.name,
      value: setValue(fat),
      children: fattyAcids,
      key: fat.name,
    };
  };

  const getVitamins = (nutrients) => {
    return nutrients
      .filter((n) => n.name.includes("Vitamin"))
      .map((n, i) => ({
        key: i,
        name: n.name,
        value: setValue(n),
      }));
  };

  const getElseNutrients = (nutrients) => {
    let elseNutrients = nutrients
      .filter(
        (n) =>
          !n.name.includes("Vitamin") &&
          !bacisNutrientsIds.includes(n.id) &&
          !fattyAcidsIds.includes(n.id) &&
          n.id !== fatId
      )
      .map((n, i) => ({
        key: i,
        name: n.name,
        value: setValue(n),
      }));

    return elseNutrients;
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
        <Text type="secondary">{food.brandName ?? food.dataSourceName}</Text>

        <Divider />

        {tab === "basic" && (
          <Table
            dataSource={getBasicNutrients(food.nutrients)}
            columns={columns}
            size="small"
            pagination={{ hideOnSinglePage: true }}
          ></Table>
        )}

        {tab === "vitamins" && (
          <Table
            dataSource={getVitamins(food.nutrients)}
            columns={columns}
            size="small"
            pagination={{ hideOnSinglePage: true }}
          ></Table>
        )}

        {tab === "else" && (
          <Table
            dataSource={getElseNutrients(food.nutrients)}
            columns={columns}
            size="small"
            pagination={{ hideOnSinglePage: true }}
          ></Table>
        )}
      </Card>
    </>
  );
};
