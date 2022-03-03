import { Modal, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";

export const AuthModal = (props) => {
  const [form] = useForm();

  const handleOk = () => {
    // setIsModalVisible(false);
    form
      .validateFields()
      .then((values) => {
        props.handleAuth(values);
      })
      .catch((errors) => {});
  };

  return (
    <Modal
      title={props.type === "login" ? "Login" : "Register"}
      visible={props.isVisible}
      onOk={handleOk}
      okText={props.type === "login" ? "Login" : "Register"}
      onCancel={props.handleCancel}
      confirmLoading={props.isLoading}
      afterClose={() => form.resetFields()}
      centered
    >
      <Form name="login" form={form}>
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
          <Input disabled={props.isLoading} />
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
          <Input.Password disabled={props.isLoading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
