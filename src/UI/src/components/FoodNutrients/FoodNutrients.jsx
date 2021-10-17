import { Table, Card, Typography, Divider } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

function FoodNutrients(params) {
  const [tab, setTab] = useState("basic");

  const onTabChange = (key) => {
    setTab(key);
  };

  return (
    <>
      <Card
        key={params.index}
        tabList={tabList}
        style={{ width: "350px", margin: "10px" }}
        onTabChange={(key) => setTab(key)}>
        <Title level={4}>{params.description}</Title>
        <Text type='secondary'>{params.brand ?? params.source}</Text>

        <Divider />

        {tab === "basic" && (
          <Table
            key={params.index}
            dataSource={params.nutrients}
            columns={columns}
            size='small'
            pagination={{ hideOnSinglePage: true }}
            loading={params.loading}></Table>
        )}

        {tab === "vitamins" && (
          <Table
            key={params.index}
            dataSource={params.vitamins}
            columns={columns}
            size='small'
            pagination={{ hideOnSinglePage: true }}
            loading={params.loading}></Table>
        )}

        {tab === "else" && (
          <Table
            key={params.index}
            dataSource={params.elseNutrients}
            columns={columns}
            size='small'
            pagination={{ hideOnSinglePage: true }}
            loading={params.loading}></Table>
        )}
      </Card>
    </>
  );
}

export default FoodNutrients;

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
