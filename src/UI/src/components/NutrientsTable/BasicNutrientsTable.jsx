import { NutrientsTable } from "./NutrientsTable";
import { getBasicNutrients } from "../../helpers/NutrientsHelper";

export const BasicNutrientsTable = ({ nutrients }) => {
  return <NutrientsTable nutrients={getBasicNutrients(nutrients)} />;
};
