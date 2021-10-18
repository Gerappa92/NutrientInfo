import { useEffect, useState } from "react";
import { Input, Pagination, Empty } from "antd";
import { GenericList } from "../../components/GenericList/GenericList";
import "./SearchPage.css";
import { FoodNutrientsListItem } from "../../components/FoodNutrientsListItem/FoodNutrientsListItem";

const { Search } = Input;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function SearchPage() {
  const defaultData = { foods: [], totalHits: 0 };
  const [data, setData] = useState(defaultData);
  const [tableLoading, setTableLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (data.foodSearchCriteria) {
      onSearch(data.foodSearchCriteria.query);
    }
  }, [page, pageSize]);

  const onSearch = (value) => {
    if (!value) {
      noData();
      return;
    }

    setTableLoading(true);
    fetch(
      `${apiBaseUrl}food?searchTerm=${value}&pageSize=${pageSize}&pageNumber=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        if (data.foods.length === 0) {
          noData();
          return;
        }
        setTableLoading(false);
        console.log(data);
      });
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  const noData = () => {
    setData(defaultData);
    setTableLoading(false);
  };

  return (
    <div className="search-page-container">
      <div>
        <Search
          className="food-search"
          placeholder="Banana"
          onSearch={onSearch}
          enterButton
          allowClear
        />
        <Pagination
          current={page}
          total={data.totalHits}
          hideOnSinglePage={true}
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
        />
        <GenericList
          items={data.foods}
          resourceName="food"
          itemComponent={FoodNutrientsListItem}
        ></GenericList>
        {data.foods.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        <Pagination
          current={page}
          total={data.totalHits}
          hideOnSinglePage={true}
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
}

export default SearchPage;
