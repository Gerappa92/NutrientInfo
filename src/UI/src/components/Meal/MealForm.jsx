import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { IngredientInput } from "./IngredientInput";
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

export const MealForm = ({
  submitButtonText = "Save",
  onFinish,
  meal,
  onAddIngredient,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (meal != null) {
      form.setFieldsValue(meal);
    }
  }, [form, meal]);

  const onValuesChange = () => {
    if (onAddIngredient == null) return;
    const ingredients = form.getFieldValue("ingredients");
    if (!ingredients) return;

    const isAnyUndefinedIngredient =
      ingredients.filter((i) => i === undefined).length > 0;

    if (isAnyUndefinedIngredient) return;

    const isAnyAmountsNull =
      ingredients.filter((i) => i.amount == null || i.amount === "").length > 0;

    if (isAnyAmountsNull) return;
    onAddIngredient(ingredients);
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
      onValuesChange={onValuesChange}
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
                initialValue={{ id: 0, amount: null, name: "" }}
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
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};
