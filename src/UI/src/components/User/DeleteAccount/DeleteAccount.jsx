import { Typography } from "antd";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthForm } from "../AuthForm/AuthForm";
import { deleteAccount } from "../../../modules/user-module";
import { UserContext } from "../../../App";

export const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const context = useContext(UserContext);

  const handleDeleteAccount = async (credentials) => {
    setIsLoading(true);
    await deleteAccount(credentials)
      .then(() => {
        context.setUser({ isLogged: false });
        history.push("/home");
      })
      .catch((e) => {
        console.error("Deleting account failed");
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
      />
    </>
  );
};
