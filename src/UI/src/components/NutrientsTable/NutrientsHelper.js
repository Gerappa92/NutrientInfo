import { bacisNutrientsIds, fatId, fattyAcidsIds } from "./NutrientsIds";

export const setNutrientValue = (nutrient) =>
  `${nutrient.value} ${nutrient.unitName.toLowerCase()}`;

export const getBasicNutrients = (nutrients) => {
  let basic = nutrients
    .filter((n) => bacisNutrientsIds.includes(n.id))
    .map((n, i) => ({
      key: i,
      name: n.name,
      value: setNutrientValue(n),
    }));
  let fat = getFats(nutrients);
  if (fat) {
    basic.push(fat);
  }
  return basic;
};

export const getFats = (nutrients) => {
  let fat = nutrients.find((n) => n.id === fatId);
  if (!fat) {
    return null;
  }
  let fattyAcids = nutrients
    .filter((n) => fattyAcidsIds.includes(n.id))
    .map((n) => ({
      name: n.name,
      value: setNutrientValue(n),
    }));
  return {
    name: fat.name,
    value: setNutrientValue(fat),
    children: fattyAcids,
    key: fat.name,
  };
};

export const getElseNutrients = (nutrients) => {
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
      value: setNutrientValue(n),
    }));

  return elseNutrients;
};

export const getVitamins = (nutrients) => {
  return nutrients
    .filter((n) => n.name.includes("Vitamin"))
    .map((n, i) => ({
      key: i,
      name: n.name,
      value: setNutrientValue(n),
    }));
};
