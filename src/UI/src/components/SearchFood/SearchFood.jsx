import { useEffect, useState } from "react";
import { Input, Checkbox } from "antd";

import httpClient from "../../modules/axios-client";

const { Search } = Input;

export const SearchFood = (props) => {
  const defaultData = { foods: [], totalHits: 0 };
  const defaultQuery = {
    searchTerm: "",
    brandOwner: "",
    requireAllWords: true,
  };
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    onSearch(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageNumber, props.pageSize]);

  const onSearch = async () => {
    if (!query.searchTerm && !query.brandOwner) {
      noData();
      return;
    }
    props.setTableLoading(true);

    const response = await httpClient.get(
      `food?searchTerm=${query.searchTerm}&pageSize=${props.pageSize}&pageNumber=${props.pageNumber}&brandOwner=${query.brandOwner}&requireAllWords=${query.requireAllWords}`
    );

    if (response.data.foods.length === 0) {
      noData();
      return;
    } else {
      props.setData(response.data);
    }

    props.setTableLoading(false);
  };

  const handleQuery = (event) => {
    const propName = event.target.name;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [propName]: event.target.value,
    }));
  };

  const onRequireAllWords = (event) => {
    setQuery((prevFullQuery) => ({
      ...prevFullQuery,
      requireAllWords: event.target.checked,
    }));
  };

  const noData = () => {
    props.setData(defaultData);
    props.setTableLoading(false);
  };

  return (
    <>
      <Input.Group compact style={{}}>
        <Input
          name="searchTerm"
          placeholder="e.g. banana, cucumber, milk"
          onChange={handleQuery}
          style={{ maxWidth: "50%", textAlign: "left" }}
          onPressEnter={onSearch}
        />
        <Search
          name="brandOwner"
          placeholder="brand owner"
          onSearch={onSearch}
          onChange={handleQuery}
          style={{ maxWidth: "50%" }}
          enterButton
        />
      </Input.Group>
      {props.enableRequireAllWordsOption && (
        <Checkbox checked={query.requireAllWords} onChange={onRequireAllWords}>
          Require All Words
        </Checkbox>
      )}
    </>
  );
};
