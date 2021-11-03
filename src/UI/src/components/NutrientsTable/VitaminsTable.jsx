import { NutrientsTable } from "./NutrientsTable";
import { SetNutrientValue } from "./SetNutrientValue";

export const VitaminsTable = ({ nutrients }) => {
  const getVitamins = (nutrients) => {
    return nutrients
      .filter((n) => n.name.includes("Vitamin"))
      .map((n, i) => ({
        key: i,
        name: n.name,
        value: SetNutrientValue(n),
      }));
  };

  return <NutrientsTable nutrients={getVitamins(nutrients)} />;
};
