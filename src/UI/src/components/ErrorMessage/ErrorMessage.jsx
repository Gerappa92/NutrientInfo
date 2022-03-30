import { Alert } from "antd";

export const ErrorMessage = ({ error }) => {
  return (
    <div hidden={!(error && error.response && error.response.data.Message)}>
      <Alert
        message={error && error.response && error.response.data.Message}
        type="error"
      />
    </div>
  );
};
