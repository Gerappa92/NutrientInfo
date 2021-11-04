import { Table } from "antd";
import styled from "styled-components";
import {
  getBasicNutrients,
  getVitamins,
  getElseNutrients,
} from "./NutrientsHelper";

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
      dataIndex: "value",
      key: "value",
    },
    {
      title: "DV%",
      dataIndex: "dailyValuePercentage",
      key: "dailyValuePercentage",
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
        size="small"
        pagination={{ hideOnSinglePage: true }}
      ></Table>
    </TableDiv>
  );
};
