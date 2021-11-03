import { NutrientsTable } from "./NutrientsTable";
import { getVitamins } from "./NutrientsHelper";

export const VitaminsTable = ({ nutrients }) => {
  return <NutrientsTable nutrients={getVitamins(nutrients)} />;
};
