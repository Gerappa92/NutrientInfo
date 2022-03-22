import { Button, List, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { device } from "../../parameters/styles/media";
import httpClient from "../../modules/axios-client";
import styled from "styled-components";

export const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    httpClient
      .get("meal/user")
      .then((response) => setRecipes(response.data))
      .catch((e) => console.error(e));
  }, []);

  const recipeItem = (recipe) => (
    <List.Item>
      <Typography.Text>{recipe.name}</Typography.Text>
    </List.Item>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["md"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<SearchOutlined />}></Button>
          <Button icon={<DeleteOutlined />} danger></Button>
        </Space>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <Typography.Title>Recipes</Typography.Title>
      <RecipesContent>
        <StyledTable
          dataSource={recipes}
          columns={columns}
          size="small"
          pagination={false}
        />
      </RecipesContent>
    </>
  );
};

const RecipesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTable = styled(Table)`
  padding: 0 10px;
  width: 100%;
  @media ${device.laptop} {
    width: 920px;
  }
`;
