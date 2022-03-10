import { useState } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import { Typography, Form, Input } from "antd";
import { resetPassword } from "../../../modules/user-module";

export const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleRestart = async (credentials) => {
    setIsLoading(true);
    await resetPassword(credentials)
      .catch((e) => {
        console.error("Reset password failed", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log("Credentials", credentials);
  };

  return (
    <>
      <Typography.Title>Reset Password</Typography.Title>
      <AuthForm
        submitButton="Restart"
        onSubmit={handleRestart}
        isLoading={isLoading}
      >
        <Form.Item
          name="newpassword"
          label="New Password"
          rules={[
            {
              required: true,
              pattern:
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
              message:
                "The password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
              validateTrigger: [],
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </AuthForm>
    </>
  );
};
