import { Alert } from "antd";

export const ErrorMessage = ({ error }) => {
  return (
    <>
      {error && error.response && error.response.data.Message && (
        <Alert
          message={error && error.response && error.response.data.Message}
          type="error"
        />
      )}
    </>
  );
};
