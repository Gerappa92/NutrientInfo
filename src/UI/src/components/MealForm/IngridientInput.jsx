import { useState } from "react";
import { Space, List, Input, Typography, Button, Spin, Pagination } from "antd";
import { SearchFood } from "../SearchFood/SearchFood";
import { FoodHeader } from "../FoodHeader/FoodHeader";

export const IngridientInput = ({
  value = {},
  hideSearch,
  onChange,
  onRemove,
}) => {
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
