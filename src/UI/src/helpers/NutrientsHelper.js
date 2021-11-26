import { bacisNutrientsIds, fatId, fattyAcidsIds } from "./NutrientsIds";

export const setNutrientValue = (nutrient) =>
  `${nutrient.value} ${nutrient.unitName.toLowerCase()}`;

const setDailyValuePercentage = (percentage) => {
  if (!percentage) return "-";
  var round = Math.round(percentage * 100) / 100;
  return `${round}%`;
};

export const getBasicNutrients = (nutrients) => {
  let basic = nutrients
    .filter((n) => bacisNutrientsIds.includes(n.id))
    .map((n, i) => ({
      key: i,
      id: n.id,
      name: n.name,
      value: n.value,
      unitName: n.unitName,
      valueWithUnit: setNutrientValue(n),
      dailyValuePercentage: setDailyValuePercentage(n.dailyValuePercentage),
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
      id: n.id,
      name: n.name,
      value: n.value,
      unitName: n.unitName,
      valueWithUnit: setNutrientValue(n),
      dailyValuePercentage: setDailyValuePercentage(n.dailyValuePercentage),
    }));
  return {
    id: fat.id,
    name: fat.name,
    value: fat.value,
    unitName: fat.unitName,
    valueWithUnit: setNutrientValue(fat),
    children: fattyAcids,
    key: fat.name,
    dailyValuePercentage: setDailyValuePercentage(fat.dailyValuePercentage),
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
      id: n.id,
      name: n.name,
      value: n.value,
      unitName: n.unitName,
      valueWithUnit: setNutrientValue(n),
      dailyValuePercentage: setDailyValuePercentage(n.dailyValuePercentage),
    }));

  return elseNutrients;
};

export const getVitamins = (nutrients) => {
  return nutrients
    .filter((n) => n.name.includes("Vitamin"))
    .map((n, i) => ({
      key: i,
      id: n.id,
      name: n.name,
      value: n.value,
      unitName: n.unitName,
      valueWithUnit: setNutrientValue(n),
      dailyValuePercentage: setDailyValuePercentage(n.dailyValuePercentage),
    }));
};
