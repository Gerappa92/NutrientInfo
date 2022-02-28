import { Button, Spin } from "antd";
import { useState } from "react";
import { List, Typography, Input, Pagination } from "antd";
import { SearchFood } from "../SearchFood/SearchFood";
import { IngridientListAddItem } from "../IngridientList/IngridientListAddItem";
import { IngridientListItem } from "../IngridientList/IngridientListItem";
import styled from "styled-components";

export const MealForm = (props) => {
  const defaultMeal = {
    name: "",
    ingridients: [],
  };
  const defaultIngridients = { foods: [], totalHits: 0 };

  const [meal, setMeal] = useState(defaultMeal);
  const [ingridients, setIngridients] = useState(defaultIngridients);
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 5 });

  const addIngridient = (ingriditent) => {
    console.log(ingriditent);
    setMeal((prevMeal) => {
      return {
        ...prevMeal,
        ingridients: [...prevMeal.ingridients, ingriditent],
      };
    });
  };

  const removeIngridient = (ingridient) => {
    setMeal((prevMeal) => {
      return {
        ...prevMeal,
        ingridients: prevMeal.ingridients.filter((i) => i.id !== ingridient.id),
      };
    });
  };

  const onPageChange = (pageNumber) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageNumber }));
  };

  const onShowSizeChange = (current, pageSize) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageSize }));
  };

  return (
    <FormDiv>
      <div>
        <Typography.Text>Meal name:</Typography.Text>
        <Input
          type="text"
          style={{ maxWidth: "200px", marginLeft: "10px" }}
          onChange={(e) =>
            setMeal((prevMeal) => ({ ...prevMeal, name: e.target.value }))
          }
        />
      </div>
      <div>
        <List
          style={{ marginTop: "10px", maxWidth: "800px" }}
          header={<Typography.Title level={5}>Ingridients</Typography.Title>}
          footer={
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
                        <IngridientListAddItem
                          ingridient={item}
                          handleClick={addIngridient}
                        />
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
          }
          bordered
          dataSource={meal.ingridients}
          renderItem={(item) => (
            <IngridientListItem
              ingridient={item}
              handleClick={removeIngridient}
            />
          )}
        ></List>
      </div>
      <Button style={{ margin: "10px", maxWidth: "200px" }} type="primary">
        Create
      </Button>
    </FormDiv>
  );
};

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
