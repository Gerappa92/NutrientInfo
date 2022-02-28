import { useState } from "react";
import { SearchFood } from "../../components/SearchFood/SearchFood";
import { Pagination, Empty, Spin, Typography } from "antd";
import { GenericList } from "../../components/GenericList/GenericList";
import { FoodNutrientsCardItem } from "../../components/FoodNutrientsCardItem/FoodNutrientsCardItem";
import styled from "styled-components";

const { Title } = Typography;

const MottoDiv = styled.div`
  margin: 0 10vw;
`;

const SearchPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 50px;
`;

// // const SearchArea = styled.div`
// //   margin: 20px 0 20px;
// // `;

function SearchPage() {
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
      <div>
        <MottoDiv>
          <Title>You are what you eat</Title>
          <Title level={5}>
            Search from thousands of products and understand what's good for you
          </Title>
        </MottoDiv>
        <SearchFood
          setData={setData}
          setTableLoading={setTableLoading}
          pageNumber={pagination.pageNumber}
          pageSize={pagination.pageSize}
        />
        <Pagination
          current={pagination.pageNumber}
          total={data.totalHits}
          hideOnSinglePage={true}
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
        />
        <Spin spinning={tableLoading} size="large">
          <GenericList
            items={data.foods}
            resourceName="food"
            itemComponent={FoodNutrientsCardItem}
          ></GenericList>

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
      </div>
    </SearchPageContainer>
  );
}

export default SearchPage;
