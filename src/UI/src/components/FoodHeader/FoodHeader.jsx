import { Space, Typography } from "antd";
const { Title, Text } = Typography;

export const FoodHeader = ({ food }) => {
  const getSource = () => {
    if (!food.brandOwner && !food.brandName) return food.dataSourceName;
    return "";
  };
  return (
    <>
      <Title level={4}>{food.name}</Title>

      <Space direction="vertical">
        <Text type="secondary">{getSource()}</Text>
        <Text type="secondary">{food.brandOwner}</Text>
        <Text type="secondary">{food.brandName}</Text>
      </Space>
    </>
  );
};
