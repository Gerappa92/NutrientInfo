import { useState } from "react";
import { Space, List, Input, Typography, Button, Spin, Pagination } from "antd";
import { SearchFood } from "../SearchFood/SearchFood";
import { FoodHeader } from "../FoodHeader/FoodHeader";

export const IngredientInput = ({ value = {}, onChange, onRemove }) => {
  const [ingredient, setIngredient] = useState({
    id: 1,
    name: "",
    amount: null,
  });

  const [ingredients, setIngredients] = useState({ foods: [], totalHits: 0 });
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 5 });
  const [hideInputs, setHideInputs] = useState(true);
  const [hideSearch, setHideSearch] = useState(false);

  const triggerChange = (changedValue) => {
    onChange?.({
      id: ingredient.id,
      name: ingredient.name,
      amount: ingredient.amount,
      ...value,
      ...changedValue,
    });
  };

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setIngredient((prevIngredient) => ({ ...prevIngredient, [name]: value }));
    triggerChange({ [name]: value });
  };

  const addIngredient = (ingredient) => {
    setIngredient(ingredient);
    triggerChange(ingredient);
    setIngredients({ foods: [], totalHits: 0 });
    setHideInputs(false);
    setHideSearch(true);
  };

  const onPageChange = (pageNumber) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageNumber }));
  };

  const onShowSizeChange = (current, pageSize) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageSize }));
  };

  return (
    <>
      {!hideSearch && (
        <>
          <SearchFood
            setData={setIngredients}
            setTableLoading={setTableLoading}
            pageNumber={pagination.pageNumber}
            pageSize={pagination.pageSize}
          />
          <Button danger type="dashed" onClick={onRemove} block>
            Remove
          </Button>

          <Spin spinning={tableLoading} size="large">
            {ingredients.foods.length > 0 && (
              <>
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
                ></List>
                <Pagination
                  current={pagination.pageNumber}
                  total={ingredients.totalHits}
                  hideOnSinglePage={true}
                  onChange={onPageChange}
                  onShowSizeChange={onShowSizeChange}
                />
              </>
            )}
          </Spin>
        </>
      )}
      <Space hidden={hideInputs} style={{ width: "100%" }}>
        <Input
          name="id"
          type="text"
          value={value.id || ingredient.id}
          onChange={handleOnChange}
          disabled={true}
          hidden
        />
        <Input
          name="name"
          type="text"
          value={value.name || ingredient.name}
          onChange={handleOnChange}
          placeholder="name"
          disabled={true}
        />
        <Input
          name="amount"
          type="number"
          value={value.amount || ingredient.amount}
          onChange={handleOnChange}
          placeholder="amount"
        />
        <Typography.Text type="secondary">g</Typography.Text>
        <Button danger type="dashed" onClick={onRemove}>
          Remove
        </Button>
      </Space>
    </>
  );
};
