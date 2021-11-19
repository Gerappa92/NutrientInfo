import { NutrientsTable } from "./NutrientsTable";
import { getElseNutrients } from "../../helpers/NutrientsHelper";

export const OtherNutrientsTable = ({ nutrients }) => {
  return <NutrientsTable nutrients={getElseNutrients(nutrients)} />;
};
