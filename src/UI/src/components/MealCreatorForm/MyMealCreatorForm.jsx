import React, { useState } from "react";

const nutrientOptionsApi = [
  { id: 1, name: "milk" },
  { id: 2, name: "milchocolate" },
  { id: 3, name: "misbanana" },
];

export const MyMealCreatorForm = () => {
  const emptyMealForm = {
    nutrients: [],
  };

  const [mealForm, setMealForm] = useState(emptyMealForm);

  const searchNutrient = (ev) => {
    const searchingValue = ev.target.value;
  };

  return (
    <form>
      <label htmlFor="nutrient">Nutrients</label>
      <input
        list="nutrients-list"
        type="search"
        id="fname"
        name="nutrient"
        onInput={searchNutrient}
      ></input>
      <datalist id="nutrients-list">
        {nutrientOptionsApi.map((o) => (
          <option key={o.id} value={o.name} />
        ))}
      </datalist>
    </form>
  );
};
