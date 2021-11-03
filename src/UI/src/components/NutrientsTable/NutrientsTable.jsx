import { Table } from "antd";
import styled from "styled-components";

const TableDiv = styled.div`
  tbody {
    font-size: smaller;
  }
`;

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
    <TableDiv>
      <Table
        dataSource={nutrients}
        columns={columns}
        size="small"
        pagination={{ hideOnSinglePage: true }}
      ></Table>
    </TableDiv>
  );
};
