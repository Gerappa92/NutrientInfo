import { NutrientsTable } from "./NutrientsTable";
import { getBasicNutrients } from "./NutrientsHelper";

export const BasicNutrientsTable = ({ nutrients }) => {
  return <NutrientsTable nutrients={getBasicNutrients(nutrients)} />;
};
