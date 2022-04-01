import { getBasicNutrients } from "../../helpers/NutrientsHelper";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { device } from "../../parameters/styles/media";
import styled from "styled-components";

export const NutrientPieChart = ({ nutrients }) => {
  let data = getBasicNutrients(nutrients);
  data.forEach((n) => {
    if (n.unitName === "MG") {
      n.value = Math.round(n.value / 10) / 100;
      n.unitName = "G";
      n.valueWithUnit = `${n.value} g`;
    }
  });
  const filteredData = data.filter((n) => n.unitName === "G");

  const COLORS = [
    { hex: "#3D348B", id: "307" }, //purple//sodium
    { hex: "#DB2B39", id: "205" }, //red//carbohydrate
    { hex: "#3DA5D9", id: "203" }, //blue//protein
    { hex: "#EE964B", id: "291" }, //orange//fiber
    { hex: "#D6D6D6", id: "269" }, //white//sugar
    { hex: "#5C8001", id: "204" }, //Avocado//fat
    { hex: "#191716", id: "-1" }, //default black
  ];

  const getColor = (id) => {
    const c = COLORS.find((c) => c.id === id);
    if (!c) {
      return COLORS.find((c) => c.id === "-1").hex;
    }
    return c.hex;
  };

  return (
    <ChardDiv>
      <ResponsiveContainer width="100%" height="100%" debounce={1}>
        <PieChart>
          <Legend iconType="circle" dataKey="name" />
          <Pie data={filteredData} dataKey="value" label>
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.id)} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChardDiv>
  );
};

const ChardDiv = styled.div`
  height: 40vh;
  @media ${device.laptop} {
    height: 60vh;
  }
`;
