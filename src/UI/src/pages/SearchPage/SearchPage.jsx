import { useState } from "react";
import { SearchFood } from "../../components/SearchFood/SearchFood";
import { Pagination, Empty, Spin, Typography } from "antd";
import { GenericList } from "../../components/GenericList/GenericList";
import { FoodNutrientsCardItem } from "../../components/FoodNutrientsCardItem/FoodNutrientsCardItem";
import styled from "styled-components";
import { device } from "../../parameters/styles/media";

const { Title } = Typography;

const SearchPage = () => {
  const defaultData = { foods: [], totalHits: 0 };
  const [data, setData] = useState(defaultData);
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });

  const onPageChange = (pageNumber) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageNumber }));
  };

  const onShowSizeChange = (current, pageSize) => {
    setPagination((prevPagination) => ({ ...prevPagination, pageSize }));
  };

  return (
    <SearchPageContainer>
      <MottoDiv>
        <Title>You are what you eat</Title>
        <Title level={5}>
          Search from thousands of products and understand what's good for you
        </Title>
      </MottoDiv>
      <SearchFoodDiv>
        <SearchFood
          setData={setData}
          setTableLoading={setTableLoading}
          pageNumber={pagination.pageNumber}
          pageSize={pagination.pageSize}
          enableRequireAllWordsOption={true}
        />
      </SearchFoodDiv>
      <Pagination
        current={pagination.pageNumber}
        total={data.totalHits}
        hideOnSinglePage={true}
        onChange={onPageChange}
        onShowSizeChange={onShowSizeChange}
      />
      <Spin spinning={tableLoading} size="large">
        <ListContainer>
          <GenericList
            items={data.foods}
            resourceName="food"
            itemComponent={FoodNutrientsCardItem}
          ></GenericList>
        </ListContainer>

        {data.foods.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Spin>
      <Pagination
        current={pagination.pageNumber}
        total={data.totalHits}
        hideOnSinglePage={true}
        onChange={onPageChange}
        onShowSizeChange={onShowSizeChange}
      />
    </SearchPageContainer>
  );
};

export default SearchPage;

const SearchPageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
`;

const MottoDiv = styled.div`
  margin: 0 10vw;
`;

const SearchFoodDiv = styled.div`
  width: 300px;
  @media ${device.laptop} {
    width: 540px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
