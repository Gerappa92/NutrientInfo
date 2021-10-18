import { Table, Card, Typography, Divider } from "antd";
import { useState } from "react";

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

  const bacisNutrientsNumbers = [
    208, //Energy
    203, //Protein
    205, //Carbohydrates
    269, //Sugar
    291, //Fiber
    307, //Sodium 2.54x Salt
  ];

  const fatNumber = "204"; //Fat

  const fattyAcidsNumbers = [
    605, //Fatty acids, total trans
    606, //Fatty acids, total saturated
    645, //Fatty acids, total monounsaturated
    646, //Fatty acids, total polyunsaturated
  ];

  const getBasicNutrients = (nutrients) => {
    let basic = nutrients
      .filter((n) => bacisNutrientsNumbers.includes(n.number))
      .map((n, i) => ({
        key: i,
        name: n.name,
        value: n.value + n.unitName,
      }));
    let fat = getFats(nutrients);
    if (fat) {
      basic.push(fat);
    }
    return basic;
  };

  const getFats = (nutrients) => {
    let fat = nutrients.find((n) => n.number === fatNumber);
    if (!fat) {
      return null;
    }
    let fattyAcids = nutrients
      .filter((n) => fattyAcidsNumbers.includes(n.number))
      .map((n) => ({
        name: n.name,
        value: n.value + n.unitName,
      }));
    return {
      name: fat.name,
      value: fat.value + fat.unitName,
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
        value: n.value + n.unitName,
      }));
  };

  const getElseNutrients = (nutrients) => {
    let elseNutrients = nutrients
      .filter(
        (n) =>
          !n.name.includes("Vitamin") &&
          !bacisNutrientsNumbers.includes(n.number) &&
          !fattyAcidsNumbers.includes(n.number) &&
          n.number !== fatNumber
      )
      .map((n, i) => ({
        key: i,
        name: n.name,
        value: n.value + n.unitName,
      }));

    return elseNutrients;
  };

  return (
    <>
      <Card
        tabList={tabList}
        style={{ width: "350px", margin: "10px" }}
        onTabChange={(key) => setTab(key)}
      >
        <Title level={4}>{food.description}</Title>
        <Text type="secondary">{food.brandName ?? food.source}</Text>

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
