import { useContext, useState } from "react";
import { Dropdown, Menu, Modal, Typography } from "antd";
import { AuthForm } from "../User/AuthForm/AuthForm";
import { register } from "../../modules/user-module";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../User/UserStateContainer/UserStateContainer";
import { Link } from "react-router-dom";
import styled from "styled-components";

const userMenu = (logout) => (
  <Menu>
    <Menu.Item key="logout" onClick={logout}>
      <Link to="/home">
        <Typography.Text>Log out</Typography.Text>
      </Link>
    </Menu.Item>
    <Menu.Item key="user-settings">
      <Link to="/user-settings/overview">
        <Typography.Text>Settings</Typography.Text>
      </Link>
    </Menu.Item>
  </Menu>
);

export const UserSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [waitingForAuth, setWaitingForAuth] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [authType, setAuthType] = useState("register");
  const userContext = useContext(UserContext);

  const loginAuthType = "login";
  const registerAuthType = "register";

  const showAuthModal = (authType) => {
    setAuthType(authType);
    setIsModalVisible(true);
  };

  const hideAuthModal = () => {
    setIsModalVisible(false);
  };

  const handleAuth = async (credentials) => {
    setWaitingForAuth(true);

    await auth(credentials)
      .then(() => {
        setIsLoginFailed(false);
      })
      .catch(() => {
        setIsLoginFailed(true);
      })
      .finally(() => {
        setWaitingForAuth(false);
      });
  };

  const auth = async (credentials) => {
    switch (authType) {
      case loginAuthType:
        await userContext.handleLogin(credentials);
        break;
      case registerAuthType:
        await register(credentials);
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    userContext.handleLogout();
    setIsModalVisible(false);
  };

  return (
    <>
      {userContext.isLogged ? (
        <Dropdown overlay={userMenu(handleLogout)} trigger="click">
          <UserHeader />
        </Dropdown>
      ) : (
        <>
          <HeaderButton onClick={() => showAuthModal(registerAuthType)}>
            Register
          </HeaderButton>
          <HeaderButton onClick={() => showAuthModal(loginAuthType)}>
            Login
          </HeaderButton>

          <Modal
            title={authType === "login" ? "Login" : "Register"}
            visible={isModalVisible}
            onCancel={hideAuthModal}
            centered
            footer={null}
          >
            <AuthForm
              submitButton={authType === "login" ? "Login" : "Register"}
              onSubmit={handleAuth}
              isLoading={waitingForAuth}
              isLoginFailed={isLoginFailed}
            />
          </Modal>
        </>
      )}
    </>
  );
};

const HeaderButton = styled.p`
  color: white;
  margin: 0 10px;
  cursor: pointer;
`;

const UserHeader = styled(UserOutlined)`
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: x-large;
  align-content: center;
  display: flex;
`;
