import {
  bacisNutrientsIds,
  fatId,
  fattyAcidsIds,
} from "../../common/NutrientsIds";
import { NutrientsTable } from "./NutrientsTable";
import { SetNutrientValue } from "./SetNutrientValue";

export const BasicNutrientsTable = ({ nutrients }) => {
  const getBasicNutrients = (nutrients) => {
    let basic = nutrients
      .filter((n) => bacisNutrientsIds.includes(n.id))
      .map((n, i) => ({
        key: i,
        name: n.name,
        value: SetNutrientValue(n),
      }));
    let fat = getFats(nutrients);
    if (fat) {
      basic.push(fat);
    }
    return basic;
  };

  const getFats = (nutrients) => {
    let fat = nutrients.find((n) => n.id === fatId);
    if (!fat) {
      return null;
    }
    let fattyAcids = nutrients
      .filter((n) => fattyAcidsIds.includes(n.id))
      .map((n) => ({
        name: n.name,
        value: SetNutrientValue(n),
      }));
    return {
      name: fat.name,
      value: SetNutrientValue(fat),
      children: fattyAcids,
      key: fat.name,
    };
  };

  return <NutrientsTable nutrients={getBasicNutrients(nutrients)} />;
};
