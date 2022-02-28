import { Space, Typography } from "antd";
const { Title, Text } = Typography;

export const FoodHeader = ({ food, titleLevel, spaceDirection }) => {
  const getSource = () => {
    if (!food.brandOwner && !food.brandName) return food.dataSourceName;
    return "";
  };
  return (
    <>
      <Title level={titleLevel ? titleLevel : 4}>{food.name}</Title>

      <Space direction={spaceDirection ? spaceDirection : "vertical"}>
        <Text type="secondary">{getSource()}</Text>
        <Text type="secondary">{food.brandOwner}</Text>
        <Text type="secondary">{food.brandName}</Text>
      </Space>
    </>
  );
};
