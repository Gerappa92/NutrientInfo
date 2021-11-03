import { NutrientsTable } from "./NutrientsTable";
import { getElseNutrients } from "./NutrientsHelper";

export const OtherNutrientsTable = ({ nutrients }) => {
  return <NutrientsTable nutrients={getElseNutrients(nutrients)} />;
};
