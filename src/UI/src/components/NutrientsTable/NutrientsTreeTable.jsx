import { Table } from "antd";
import {
  getBasicNutrients,
  getVitamins,
  getElseNutrients,
} from "./NutrientsHelper";

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
  ];

  const data = [
    { key: 1, name: "Basics", children: getBasicNutrients(nutrients) },
    // { key: 2, name: "fats", children: [fats] },
    { key: 3, name: "Vitamins", children: getVitamins(nutrients) },
    { key: 4, name: "Others", children: getElseNutrients(nutrients) },
  ];
  return (
    <Table
      defaultExpandedRowKeys={[1]}
      dataSource={data}
      columns={columns}
      size="small"
      pagination={{ hideOnSinglePage: true }}
    ></Table>
  );
};
