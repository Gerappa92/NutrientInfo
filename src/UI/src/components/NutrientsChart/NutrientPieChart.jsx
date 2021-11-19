import { getBasicNutrients } from "../../helpers/NutrientsHelper";
import { PieChart, Pie, Cell, Tooltip, LabelList, Legend } from "recharts";

export const NutrientPieChart = ({ nutrients }) => {
  let data = getBasicNutrients(nutrients);

  const COLORS = [
    "#191716",
    "#DAEFB3",
    "#3D348B",
    "#DB2B39",
    "#3DA5D9",
    "#EE964B",
    "#EA638C",
    "#5C8001",
    "#EFEFEF",
  ];
  return (
    <>
      <PieChart width={400} height={400}>
        <Pie data={data} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend dataKey="name" />
        <Tooltip />
      </PieChart>
    </>
  );
};
