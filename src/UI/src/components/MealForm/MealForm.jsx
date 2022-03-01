import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Spin,
  List,
  Pagination,
  Typography,
} from "antd";
import { SearchFood } from "../SearchFood/SearchFood";
import { FoodHeader } from "../FoodHeader/FoodHeader";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const MealForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    const url = `${apiBaseUrl}mealmaker`;
    // axios.post(url, values);
  };

  const validateIngridients = (_, ingridients) => {
    if (!ingridients || ingridients.length < 1) {
      return Promise.reject(new Error("At least 1 ingredient is required"));
    }
    return Promise.resolve();
  };

  const validateIngridientAmount = (_, value) => {
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
        name="ingridients"
        rules={[
          {
            validator: validateIngridients,
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
                name={[name, "ingridient"]}
                label="Ingridient"
                rules={[
                  {
                    validator: validateIngridientAmount,
                  },
                ]}
              >
                <IngridientInput
                  hideSearch={index + 1 < fields.length}
                  onRemove={() => remove(name)}
                />
              </Form.Item>
            ))}
            <Form.Item {...tailLayout}>
              <Form.ErrorList errors={errors} />
              <Button type="dashed" onClick={() => add()}>
                Add Ingridient
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

const IngridientInput = ({ value = {}, hideSearch, onChange, onRemove }) => {
  const [ingridient, setIngridient] = useState({
    id: 1,
    name: "",
    amount: null,
  });

  const [ingridients, setIngridients] = useState({ foods: [], totalHits: 0 });
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 5 });

  const triggerChange = (changedValue) => {
    onChange?.({
      id: ingridient.id,
      name: ingridient.name,
      amount: ingridient.amount,
      ...value,
      ...changedValue,
    });
  };

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setIngridient((prevIngridient) => ({ ...prevIngridient, [name]: value }));
    triggerChange({ [name]: value });
  };

  const addIngridient = (ingridient) => {
    setIngridient(ingridient);
    triggerChange(ingridient);
    setIngridients({ foods: [], totalHits: 0 });
  };

  const onPageChange = (pageNumber) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageNumber }));
  };

  const onShowSizeChange = (current, pageSize) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageSize }));
  };

  return (
    <>
      <Space>
        <Input
          name="id"
          type="text"
          value={value.id || ingridient.id}
          onChange={handleOnChange}
          disabled={true}
          hidden
        />
        <Input
          name="name"
          type="text"
          value={value.name || ingridient.name}
          onChange={handleOnChange}
          placeholder="name"
          disabled={true}
        />
        <Input
          name="amount"
          type="number"
          value={value.amount || ingridient.amount}
          onChange={handleOnChange}
          placeholder="amount"
        />
        <Typography.Text type="secondary">g</Typography.Text>
        <Button danger type="dashed" onClick={onRemove}>
          Remove
        </Button>
      </Space>
      {!hideSearch && (
        <>
          <SearchFood
            setData={setIngridients}
            setTableLoading={setTableLoading}
            pageNumber={pagination.pageNumber}
            pageSize={pagination.pageSize}
          />
          <Spin spinning={tableLoading} size="large">
            {ingridients.foods.length > 0 && (
              <>
                <List
                  bordered
                  dataSource={ingridients.foods}
                  renderItem={(item) => (
                    <List.Item>
                      <FoodHeader
                        food={item}
                        titleLevel={5}
                        spaceDirection="horizontal"
                      />
                      <Button onClick={() => addIngridient(item)}>Add</Button>
                    </List.Item>
                  )}
                ></List>
                <Pagination
                  current={pagination.pageNumber}
                  total={ingridients.totalHits}
                  hideOnSinglePage={true}
                  onChange={onPageChange}
                  onShowSizeChange={onShowSizeChange}
                />
              </>
            )}
          </Spin>
        </>
      )}
    </>
  );
};
