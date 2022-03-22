import React from "react";
import { Form, Input, Button } from "antd";
import { IngredientInput } from "./IngredientInput";
import httpClient from "../../modules/axios-client";
import { size } from "../../parameters/styles/media";

const span = 4;

const layout = {
  labelCol: { span: span },
};

const tailLayout = {
  wrapperCol: {
    offset: window.innerWidth <= size.mobileL ? 0 : span,
  },
};

export const MealForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    httpClient.post("meal/create", values);
  };

  const onFieldsChange = async (changed, all) => {
    await calculateNutrients();
  };

  const calculateNutrients = async () => {
    const ingredients = form.getFieldValue("ingredients");

    if (!ingredients) return;

    const isAnyUndefinedIngredient =
      ingredients.filter((i) => i === undefined).length > 0;

    if (isAnyUndefinedIngredient) return;

    const isAnyAmountsNull =
      ingredients.filter((i) => i.amount === null).length > 0;

    if (isAnyAmountsNull) return;

    await httpClient
      .post("meal/calculate-nutrients", { ingredients: ingredients })
      .then((nutrients) => {
        props.setNutrients(nutrients.data);
      });
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
    <Form
      {...layout}
      form={form}
      name="meal-form"
      onFinish={onFinish}
      onFieldsChange={onFieldsChange}
    >
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
            {fields.map(({ key, name, ...restField }) => (
              <Form.Item
                initialValue={{ id: 0, amount: null }}
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
              <Button type="dashed" onClick={() => add()} block>
                Add Ingredient
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
