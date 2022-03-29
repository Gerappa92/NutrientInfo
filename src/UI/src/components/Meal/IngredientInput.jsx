import { useState } from "react";
import { Space, List, Input, Typography, Button } from "antd";
import { SearchFood } from "../SearchFood/SearchFood";
import { FoodHeader } from "../FoodHeader/FoodHeader";

export const IngredientInput = ({ value = {}, onChange, onRemove }) => {
  const [ingredients, setIngredients] = useState({ foods: [] });

  const triggerChange = (changedValue) => {
    onChange?.({
      ...value,
      ...changedValue,
    });
  };

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    triggerChange({ [name]: value });
  };

  const addIngredient = (ingredient) => {
    triggerChange(ingredient);
    setIngredients({ foods: [] });
  };

  return (
    <>
      {value.name === "" && (
        <>
          <SearchFood setData={setIngredients}>
            {ingredients.foods.length > 0 && (
              <List
                bordered
                dataSource={ingredients.foods}
                renderItem={(item) => (
                  <List.Item>
                    <FoodHeader
                      food={item}
                      titleLevel={5}
                      spaceDirection="horizontal"
                    />
                    <Button onClick={() => addIngredient(item)}>Add</Button>
                  </List.Item>
                )}
              />
            )}
          </SearchFood>
          <Button danger type="dashed" onClick={onRemove} block>
            Remove
          </Button>
        </>
      )}
      <Space hidden={value.name === ""} style={{ width: "100%" }}>
        <Input
          name="id"
          type="text"
          value={value.id}
          onChange={handleOnChange}
          disabled={true}
          hidden
        />
        <Input
          name="name"
          type="text"
          value={value.name}
          onChange={handleOnChange}
          placeholder="name"
          disabled={true}
        />
        <Input
          name="amount"
          type="number"
          value={value.amount}
          onChange={handleOnChange}
          placeholder="amount"
        />
        <Typography.Text type="secondary">g</Typography.Text>
        <Button danger type="dashed" onClick={onRemove}>
          Remove
        </Button>
      </Space>
    </>
  );
};
