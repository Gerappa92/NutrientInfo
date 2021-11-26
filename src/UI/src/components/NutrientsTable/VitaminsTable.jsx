import { NutrientsTable } from "./NutrientsTable";
import { getVitamins } from "../../helpers/NutrientsHelper";

export const VitaminsTable = ({ nutrients }) => {
  return <NutrientsTable nutrients={getVitamins(nutrients)} />;
};
