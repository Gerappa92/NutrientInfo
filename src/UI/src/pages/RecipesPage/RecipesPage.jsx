import { Button, Space, Spin, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { device } from "../../parameters/styles/media";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const RecipesPage = () => {
  const [recipes, isLoading, error] = useGet("meal/user");

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
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/meal-details/${record.id}`}>
            <Button icon={<SearchOutlined />}></Button>
          </Link>
          <Button icon={<DeleteOutlined />} danger></Button>
        </Space>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <Typography.Title>Recipes</Typography.Title>
      <Spin spinning={isLoading}>
        {recipes && (
          <RecipesContent>
            <StyledTable
              dataSource={recipes.map((r) => ({ key: r.id, ...r }))}
              columns={columns}
              size="small"
              pagination={false}
            />
          </RecipesContent>
        )}
        {error && <ErrorMessage error={error} />}
      </Spin>
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
