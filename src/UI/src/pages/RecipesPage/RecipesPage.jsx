import {
  Button,
  Popconfirm,
  Space,
  Spin,
  Table,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { device } from "../../parameters/styles/media";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useDelete } from "../../hooks/useDelete";

export const RecipesPage = () => {
  const [recipes, isLoading, error, getMeals] = useGet("meal/user");
  const [, isDeleting, errorDelete, handleDelete] = useDelete(null, false);

  const handleConfirmDelete = (id) => {
    handleDelete(`meal/${id}`)
      .then(() => {
        message.success("Recipe deleted!");
        getMeals();
      })
      .catch((e) => message.error("Deleting recipe failed!"));
  };

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
          <Popconfirm
            title="Are you sure to delete this recipe?"
            onConfirm={() => handleConfirmDelete(record.id)}
            okButtonProps={{ loading: isDeleting }}
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </Space>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <Typography.Title>Recipes</Typography.Title>
      <Spin spinning={isLoading || isDeleting}>
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
        {errorDelete && <ErrorMessage error={errorDelete} />}
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
