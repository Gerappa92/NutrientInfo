import React from "react";
import { Form, Input, Button } from "antd";
import { IngredientInput } from "./IngredientInput";
import httpClient from "../../modules/axios-client";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

export const MealForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    httpClient.post("meal/create", values);
  };

  const validateIngredients = (_, ingredients) => {
    if (!ingredients || ingredients.length < 1) {
      return Promise.reject(new Error("At least 1 ingredient is required"));
    }
    return Promise.resolve();
  };

  const validateIngredientsAmount = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("An ingredient must selected"));
    }
    if (value.amount > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Amount must be grater than zero"));
  };

  return (
    <Form {...layout} form={form} name="meal-form" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Meal name"
        rules={[
          {
            required: true,
            message: "The name of the meal must be specified",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={2} placeholder="This meal is perfect for..." />
      </Form.Item>
      <Form.List
        name="ingredients"
        rules={[
          {
            validator: validateIngredients,
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Form.Item
                style={{ marginBottom: 5 }}
                {...restField}
                key={key}
                name={[name]}
                label="Ingredient"
                rules={[
                  {
                    validator: validateIngredientsAmount,
                  },
                ]}
              >
                <IngredientInput onRemove={() => remove(name)} />
              </Form.Item>
            ))}
            <Form.Item {...tailLayout}>
              <Form.ErrorList errors={errors} />
              <Button type="dashed" onClick={() => add()}>
                Add Ingredient
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
