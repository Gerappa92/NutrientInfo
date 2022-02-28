import { useEffect, useState } from "react";
import { Input, Checkbox } from "antd";
import axios from "axios";
import styled from "styled-components";

const { Search } = Input;

const SearchArea = styled.div`
  margin: 20px 0 20px;
`;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

console.log("hello search food!");

export const SearchFood = (props) => {
  const defaultData = { foods: [], totalHits: 0 };
  const defaultQuery = {
    searchTerm: "",
    brandOwner: "",
    requireAllWords: false,
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

    var response = await axios.get(
      `${apiBaseUrl}food?searchTerm=${query.searchTerm}&pageSize=${props.pageSize}&pageNumber=${props.pageNumber}&brandOwner=${query.brandOwner}&requireAllWords=${query.requireAllWords}`
    );

    if (response.data.foods.length === 0) {
      noData();
      return;
    } else {
      props.setData(response.data);
    }

    props.setTableLoading(false);
  };

  const onSearchTerm = (event) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      searchTerm: event.target.value,
    }));
  };

  const onBrandOwnerChange = (event) => {
    setQuery((prevFullQuery) => ({
      ...prevFullQuery,
      brandOwner: event.target.value,
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
    <SearchArea>
      <Input.Group compact style={{ margin: "0 0 20px" }}>
        <Input
          placeholder="e.g. banana, cucumber, milk"
          onChange={onSearchTerm}
          style={{ maxWidth: "200px", textAlign: "left" }}
          onPressEnter={onSearch}
        />
        <Search
          placeholder="brand owner"
          onSearch={onSearch}
          onChange={onBrandOwnerChange}
          style={{ maxWidth: "200px" }}
          enterButton
        />
      </Input.Group>
      <Checkbox onChange={onRequireAllWords}>Require All Words</Checkbox>
    </SearchArea>
  );
};
