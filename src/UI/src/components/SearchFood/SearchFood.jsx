import { useState } from "react";
import { Input, Checkbox, Pagination, Spin } from "antd";
import httpClient from "../../modules/axios-client";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

const { Search } = Input;

export const SearchFood = ({
  setData,
  enableRequireAllWordsOption,
  children,
  width = "fit-content",
}) => {
  const defaultQuery = {
    searchTerm: "",
    brandOwner: "",
    requireAllWords: true,
  };

  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(defaultQuery);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [error, setError] = useState(null);

  const onSearch = (pageNumber = 1, pageSize = 10) => {
    if (!query.searchTerm && !query.brandOwner) {
      noData();
      return;
    }
    setIsLoading(true);

    httpClient
      .get(
        `food?searchTerm=${query.searchTerm}&brandOwner=${query.brandOwner}&requireAllWords=${query.requireAllWords}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .then((response) => {
        if (response.data.foods.length === 0) {
          noData();
        } else {
          setData(response.data);
          setTotalHits(response.data.totalHits);
        }
      })
      .catch((e) => setError(e))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleQuery = (event) => {
    const propName = event.target.name;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [propName]: event.target.value,
    }));
    setPagination((prevPagination) => ({ ...prevPagination, pageNumber: 1 }));
  };

  const onRequireAllWords = (event) => {
    setQuery((prevFullQuery) => ({
      ...prevFullQuery,
      requireAllWords: event.target.checked,
    }));
  };

  const noData = () => {
    setData({ foods: [] });
  };

  const onPageChange = (pageNumber) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageNumber }));
    onSearch(pageNumber);
  };

  const onShowSizeChange = (_, pageSize) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageSize }));
    onSearch(pagination.pageNumber, pageSize);
  };

  return (
    <>
      <div style={{ width: { width } }}>
        <Input.Group compact style={{}}>
          <Input
            name="searchTerm"
            placeholder="e.g. banana, cucumber, milk"
            onChange={handleQuery}
            style={{ maxWidth: "50%", textAlign: "left" }}
            onPressEnter={() =>
              onSearch(pagination.pageNumber, pagination.pageSize)
            }
          />
          <Search
            name="brandOwner"
            placeholder="brand owner"
            onSearch={() =>
              onSearch(pagination.pageNumber, pagination.pageSize)
            }
            onChange={handleQuery}
            style={{ maxWidth: "50%" }}
            enterButton
          />
        </Input.Group>
        {enableRequireAllWordsOption && (
          <Checkbox
            checked={query.requireAllWords}
            onChange={onRequireAllWords}
          >
            Require All Words
          </Checkbox>
        )}
      </div>
      <ErrorMessage error={error} />

      <Spin spinning={isLoading} size="large">
        {children}
      </Spin>
      <Pagination
        current={pagination.pageNumber}
        total={totalHits}
        hideOnSinglePage={true}
        onChange={onPageChange}
        onShowSizeChange={onShowSizeChange}
      />
    </>
  );
};
