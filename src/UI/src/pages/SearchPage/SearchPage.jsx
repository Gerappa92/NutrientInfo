import { useState } from "react";
import { SearchFood } from "../../components/SearchFood/SearchFood";
import { Empty, Typography } from "antd";
import { GenericList } from "../../components/GenericList/GenericList";
import { FoodNutrientsCardItem } from "../../components/FoodNutrientsCardItem/FoodNutrientsCardItem";
import styled from "styled-components";

const { Title } = Typography;

const SearchPage = () => {
  const [data, setData] = useState({ foods: [] });

  return (
    <SearchPageContainer>
      <MottoDiv>
        <Title>You are what you eat</Title>
        <Title level={5}>
          Search from thousands of products and understand what's good for you
        </Title>
      </MottoDiv>

      <SearchFood setData={setData} enableRequireAllWordsOption={true}>
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
      </SearchFood>
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

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
