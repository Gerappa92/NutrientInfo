import { Table } from "antd";
import styled from "styled-components";
import {
  getBasicNutrients,
  getVitamins,
  getElseNutrients,
} from "../../helpers/NutrientsHelper";

const TableDiv = styled.div`
  tbody {
    font-size: smaller;
  }
`;

export const NutrientsTreeTable = ({ nutrients }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount per 100g",
      dataIndex: "valueWithUnit",
      key: "valueWithUnit",
    },
    {
      title: "DV%",
      dataIndex: "dailyValuePercentage",
      key: "dailyValuePercentage",
      render: (text, row) => {
        if (row.status === "Bad") {
          return <p style={{ color: "red" }}>{text}</p>;
        } else if (row.status === "Good") {
          return <p style={{ color: "green" }}>{text}</p>;
        } else return text;
      },
    },
  ];

  const data = [
    { key: 1, name: "Basics", children: getBasicNutrients(nutrients) },
    { key: 2, name: "Vitamins", children: getVitamins(nutrients) },
    { key: 3, name: "Others", children: getElseNutrients(nutrients) },
  ];
  return (
    <TableDiv>
      <Table
        defaultExpandedRowKeys={[1]}
        dataSource={data}
        columns={columns}
        size='small'
        pagination={{ hideOnSinglePage: true }}></Table>
    </TableDiv>
  );
};
