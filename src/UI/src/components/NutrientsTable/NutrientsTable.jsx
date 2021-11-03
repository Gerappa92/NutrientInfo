import { Table } from "antd";

export const NutrientsTable = ({ nutrients }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount per 100g",
      dataIndex: "value",
      key: "value",
    },
  ];
  return (
    <Table
      dataSource={nutrients}
      columns={columns}
      size="small"
      pagination={{ hideOnSinglePage: true }}
    ></Table>
  );
};
