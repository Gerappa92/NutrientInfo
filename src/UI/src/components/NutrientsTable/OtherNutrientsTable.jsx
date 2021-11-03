import {
  bacisNutrientsIds,
  fatId,
  fattyAcidsIds,
} from "../../common/NutrientsIds";
import { NutrientsTable } from "./NutrientsTable";
import { SetNutrientValue } from "./SetNutrientValue";

export const OtherNutrientsTable = ({ nutrients }) => {
  const getElseNutrients = (nutrients) => {
    let elseNutrients = nutrients
      .filter(
        (n) =>
          !n.name.includes("Vitamin") &&
          !bacisNutrientsIds.includes(n.id) &&
          !fattyAcidsIds.includes(n.id) &&
          n.id !== fatId
      )
      .map((n, i) => ({
        key: i,
        name: n.name,
        value: SetNutrientValue(n),
      }));

    return elseNutrients;
  };

  return <NutrientsTable nutrients={getElseNutrients(nutrients)} />;
};
