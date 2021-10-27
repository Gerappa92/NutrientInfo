import { useEffect, useState } from "react";
import { Input, Pagination, Empty, Spin } from "antd";
import { GenericList } from "../../components/GenericList/GenericList";
import "./SearchPage.css";
import { FoodNutrientsListItem } from "../../components/FoodNutrientsListItem/FoodNutrientsListItem";
import axios from "axios";

const { Search } = Input;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function SearchPage() {
  const defaultData = { foods: [], totalHits: 0 };
  const [query, setQuery] = useState();
  const [data, setData] = useState(defaultData);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    onSearch(query); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  const onSearch = async (searchTerm) => {
    setQuery(searchTerm);
    if (!searchTerm) {
      noData();
      return;
    }
    setTableLoading(true);

    var response = await axios.get(
      `${apiBaseUrl}food?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );

    if (response.data.foods.length === 0) {
      noData();
      return;
    } else {
      setData(response.data);
    }

    setTableLoading(false);
  };

  const onPageChange = (pageNumber) => {
    setPageNumber(pageNumber);
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
          current={pageNumber}
          total={data.totalHits}
          hideOnSinglePage={true}
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
        />
        <Spin spinning={tableLoading} size="large">
          <GenericList
            items={data.foods}
            resourceName="food"
            itemComponent={FoodNutrientsListItem}
          ></GenericList>

          {data.foods.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Spin>
        <Pagination
          current={pageNumber}
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
