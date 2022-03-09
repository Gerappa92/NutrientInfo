import { Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { AuthForm } from "../AuthForm/AuthForm";

export const AuthModal = (props) => {
  const [form] = useForm();

  return (
    <Modal
      title={props.type === "login" ? "Login" : "Register"}
      visible={props.isVisible}
      onCancel={props.handleCancel}
      confirmLoading={props.isLoading}
      afterClose={() => form.resetFields()}
      centered
      footer={null}
    >
      <AuthForm
        submitButton={props.type === "login" ? "Login" : "Register"}
        onSubmit={props.handleAuth}
        isLoading={props.isLoading}
      />
    </Modal>
  );
};
