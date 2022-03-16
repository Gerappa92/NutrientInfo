import { Typography } from "antd";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthForm } from "../AuthForm/AuthForm";
import { deleteAccount } from "../../../modules/user-module";
import { UserContext } from "../UserStateContainer/UserStateContainer";

export const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);
  const history = useHistory();
  const context = useContext(UserContext);

  const handleDeleteAccount = async (credentials) => {
    setIsLoading(true);
    await deleteAccount(credentials)
      .then(() => {
        setDeleteFailed(false);
        context.handleLogout();
        history.push("/home");
      })
      .catch(() => {
        setDeleteFailed(true);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Typography.Title>Delete account</Typography.Title>
      <AuthForm
        submitButton="Delete"
        submitButtonType="danger"
        onSubmit={handleDeleteAccount}
        isLoading={isLoading}
      >
        {deleteFailed && (
          <Typography.Text type="danger">
            User with this login and password does not exist
          </Typography.Text>
        )}
      </AuthForm>
    </>
  );
};
