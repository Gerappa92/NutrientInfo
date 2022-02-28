import { useState } from "react";
import { Button, Input, List } from "antd";
import { FoodHeader } from "../FoodHeader/FoodHeader";

export const IngridientListAddItem = (props) => {
  const [amount, setAmount] = useState();

  const getIngridient = () => {
    return {
      ...props.ingridient,
      amount: amount,
    };
  };

  return (
    <List.Item>
      <FoodHeader
        food={props.ingridient}
        titleLevel={5}
        spaceDirection="horizontal"
      />

      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: 100 }}
      />
      <Button onClick={() => props.handleClick(getIngridient())}>Add</Button>
    </List.Item>
  );
};
