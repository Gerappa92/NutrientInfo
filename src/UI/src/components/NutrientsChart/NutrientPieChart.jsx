import { PieChart, Pie, Cell, Tooltip, LabelList } from "recharts";

export const NutrientPieChart = (data) => {
  data = [
    { name: "A", value: 100 },
    { name: "B", value: 100 },
    { name: "C", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <>
      <PieChart width={400} height={400}>
        <Pie data={data} fill='#8884d8' label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList dataKey='name' />
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
};
