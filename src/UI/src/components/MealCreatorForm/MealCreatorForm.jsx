import { Form, Input, Button } from "antd";

export const MealCreatorForm = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    props.setMeal(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form name="meal-form" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        label="Meal name"
        name="name"
        rules={[{ required: true, message: "Please input meal name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
