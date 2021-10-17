import { useEffect, useState } from "react";
import { Input, Pagination, Empty } from "antd";
import FoodNutrients from "../../components/FoodNutrients/FoodNutrients";
import "./SearchPage.css";

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

  const getBasicNutrients = (nutrients) => {
    let basic = nutrients
      .filter((n) => bacisNutrientsNumbers.includes(n.number))
      .map((n) => ({
        name: n.name,
        value: n.value + n.unitName,
      }));
    let fat = getFats(nutrients);
    if (fat) {
      basic.push(fat);
    }
    return basic;
  };

  const getVitamins = (nutrients) => {
    return nutrients
      .filter((n) => n.name.includes("Vitamin"))
      .map((n, i) => ({
        name: n.name,
        value: n.value + n.unitName,
      }));
  };

  const getElseNutrients = (nutrients) => {
    let elseNutrients = nutrients
      .filter(
        (n) =>
          !n.name.includes("Vitamin") &&
          !bacisNutrientsNumbers.includes(n.number) &&
          !fattyAcidsNumbers.includes(n.number) &&
          n.number !== fatNumber
      )
      .map((n, i) => ({
        name: n.name,
        value: n.value + n.unitName,
      }));

    return elseNutrients;
  };

  const getFats = (nutrients) => {
    let fat = nutrients.find((n) => n.number === fatNumber);
    if (!fat) {
      return null;
    }
    let fattyAcids = nutrients
      .filter((n) => fattyAcidsNumbers.includes(n.number))
      .map((n) => ({
        name: n.name,
        value: n.value + n.unitName,
      }));
    return {
      name: fat.name,
      value: fat.value + fat.unitName,
      children: fattyAcids,
      key: fat.name,
    };
  };

  return (
    <div className='search-page-container'>
      <div>
        <Search
          className='food-search'
          placeholder='Banana'
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
        <div className='food-nutrients'>
          {data.foods.map((f, i) => (
            <FoodNutrients
              index={i}
              description={f.description}
              brand={f.brandName}
              source={f.source}
              nutrients={getBasicNutrients(f.nutrients)}
              vitamins={getVitamins(f.nutrients)}
              elseNutrients={getElseNutrients(f.nutrients)}
              loading={tableLoading}></FoodNutrients>
          ))}
        </div>
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

const bacisNutrientsNumbers = [
  208, //Energy
  203, //Protein
  205, //Carbohydrates
  269, //Sugar
  291, //Fiber
  307, //Sodium 2.54x Salt
];

const fatNumber = "204"; //Fat

const fattyAcidsNumbers = [
  605, //Fatty acids, total trans
  606, //Fatty acids, total saturated
  645, //Fatty acids, total monounsaturated
  646, //Fatty acids, total polyunsaturated
];

export default SearchPage;
