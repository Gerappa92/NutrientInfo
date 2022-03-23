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
          <Typography.Text>Description:</Typography.Text>
          <Typography.Text>{meal.description}</Typography.Text>
        </>
      )}
      <Table
        columns={columns}
        dataSource={meal.ingredients}
        pagination={false}
      />
    </>
  );
};
