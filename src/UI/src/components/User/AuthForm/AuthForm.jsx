import { Button, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";

export const AuthForm = ({
  onSubmit,
  isLoading = false,
  submitButton = "Login",
  submitButtonType = "primary",
  children,
}) => {
  const [form] = useForm();

  const onFinishFailed = () => {
    form.validateFields();
  };

  const handleSubmit = (values) => {
    form.resetFields();
    onSubmit(values);
  };

  return (
    <Spin spinning={isLoading}>
      <Form
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 4 }}
        name="delete-account-form"
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              validateTrigger: [],
            },
          ]}
        >
          <Input disabled={isLoading} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
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
          <Input.Password disabled={isLoading} />
        </Form.Item>
        {children}
        <Form.Item>
          <Button type={submitButtonType} htmlType="submit">
            {submitButton}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
