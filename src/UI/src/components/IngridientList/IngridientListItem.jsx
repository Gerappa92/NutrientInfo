import styled from "styled-components";
import { FoodHeader } from "../FoodHeader/FoodHeader";
import { Typography, Button, List } from "antd";

const { Text } = Typography;

export const IngridientListItem = (props) => {
  return (
    <List.Item>
      <FoodHeader
        food={props.ingridient}
        titleLevel={5}
        spaceDirection="horizontal"
      />
      <Text>{props.ingridient.amount}</Text>
      <Button danger onClick={() => props.handleClick(props.ingridient)}>
        Remove
      </Button>
    </List.Item>
  );
};
