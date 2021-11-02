import { useEffect, useState } from "react";
import { Input, Pagination, Empty, Spin, Checkbox } from "antd";
import { GenericList } from "../../components/GenericList/GenericList";
import { FoodNutrientsListItem } from "../../components/FoodNutrientsListItem/FoodNutrientsListItem";
import axios from "axios";
import styled from "styled-components";

const { Search } = Input;
const SearchPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 50px;
`;

const SearchArea = styled.div`
  margin: 20px 0 20px;
`;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function SearchPage() {
  const defaultData = { foods: [], totalHits: 0 };
  const [query, setQuery] = useState("");
  const [brandOwner, setBrandOwner] = useState("");
  const [requireAllWords, setRequireAllWords] = useState(false);
  const [data, setData] = useState(defaultData);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    onSearch(query); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  const onSearch = async () => {
    if (!query && !brandOwner) {
      noData();
      return;
    }
    setTableLoading(true);

    var response = await axios.get(
      `${apiBaseUrl}food?searchTerm=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}&brandOwner=${brandOwner}&requireAllWords=${requireAllWords}`
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
    <SearchPageContainer>
      <div>
        <SearchArea>
          <Input.Group compact style={{ margin: "0 0 20px" }}>
            <Input
              placeholder="e.g. banana, cucumber, milk"
              onChange={(e) => setQuery(e.target.value)}
              style={{ maxWidth: "200px", textAlign: "left" }}
              onPressEnter={onSearch}
            />
            <Search
              placeholder="brand owner"
              onSearch={onSearch}
              onChange={(e) => setBrandOwner(e.target.value)}
              style={{ maxWidth: "200px" }}
              enterButton
            />
          </Input.Group>
          <Checkbox onChange={(e) => setRequireAllWords(e.target.checked)}>
            Require All Words
          </Checkbox>
        </SearchArea>
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
    </SearchPageContainer>
  );
}

export default SearchPage;
