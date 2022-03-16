import { useState } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import { Typography, Form, Input } from "antd";
import { resetPassword } from "../../../modules/user-module";

export const ResetPassword = () => {
  const [settings, setSettings] = useState({
    loading: false,
    fail: false,
    success: false,
  });

  const handleRestart = async (credentials) => {
    setSettings({ loading: true, fail: false, success: false });
    await resetPassword(credentials)
      .then(() => {
        setSettings({ loading: false, fail: false, success: true });
      })
      .catch(() => {
        setSettings({ loading: false, fail: true, success: false });
      });
  };

  return (
    <>
      <Typography.Title>Reset Password</Typography.Title>
      <AuthForm
        submitButton="Restart"
        onSubmit={handleRestart}
        isLoading={settings.loading}
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
        {settings.fail && (
          <Typography.Text type="danger">
            Password reset failed. Try again.
          </Typography.Text>
        )}
        {settings.success && (
          <Typography.Text type="success">
            Password reset successed
          </Typography.Text>
        )}
      </AuthForm>
    </>
  );
};
