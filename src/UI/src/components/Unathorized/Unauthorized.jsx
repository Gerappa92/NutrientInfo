import { Typography } from "antd";
import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <>
      <Typography.Title>Access denied</Typography.Title>
      <Typography.Text>
        Please log in or back to <Link to="/home">home page</Link>
      </Typography.Text>
    </>
  );
};
