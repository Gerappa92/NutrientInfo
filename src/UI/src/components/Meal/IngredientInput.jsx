import { useState } from "react";
import { List, Input, Typography, Button } from "antd";
import { SearchFood } from "../SearchFood/SearchFood";
import { FoodHeader } from "../FoodHeader/FoodHeader";
import styled from "styled-components";

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
          <Button
            style={{ marginTop: "5px" }}
            danger
            type="dashed"
            onClick={onRemove}
            block
          >
            Remove
          </Button>
        </>
      )}
      {value.name !== "" && (
        <IngredientDiv>
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
        </IngredientDiv>
      )}
    </>
  );
};

const IngredientDiv = styled.div`
  width: 100%;
  display: flex;
  > * {
    margin: 0 2px;
  }
`;
