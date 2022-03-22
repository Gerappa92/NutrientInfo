import { Button, List, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import httpClient from "../../modules/axios-client";

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
    },
  ];

  const recipesTableData = () => {
    recipes.map((r) => ({
      name: r.name,
      description: r.description,
    }));
  };

  return (
    <>
      <Typography.Title>Recipes</Typography.Title>
      <Table dataSource={recipes} columns={columns} size="small" />
    </>
  );
};
