import { Table, Typography } from "antd";

export const MealDetails = ({ meal }) => {
  const columns = [
    {
      title: "Ingredient",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) => `${record.amount} g`,
    },
  ];

  return (
    <>
      {meal.description && (
        <>
          <Typography.Title level={4}>Description:</Typography.Title>
          <Typography.Text>{meal.description}</Typography.Text>
        </>
      )}
      <Typography.Title level={4}>Ingredients</Typography.Title>
      <Table
        columns={columns}
        dataSource={meal.ingredients.map((i) => ({ key: i.id, ...i }))}
        pagination={false}
      />
    </>
  );
};
