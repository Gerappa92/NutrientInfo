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
  const [loginModal, setLoginModal] = useState({
    show: false,
    loading: false,
    fail: false,
  });
  const [registryModal, setRegistryModal] = useState({
    show: false,
    loading: false,
    fail: false,
    success: false,
  });

  const showLoginModal = () =>
    setLoginModal(() => ({ show: true, loading: false, fail: false }));
  const hideLoginModal = () =>
    setLoginModal((prev) => ({ ...prev, show: false }));

  const showRegistryModal = () =>
    setRegistryModal(() => ({
      show: true,
      loading: false,
      fail: false,
      success: false,
    }));
  const hideRegistryModal = () =>
    setRegistryModal((prev) => ({ ...prev, show: false }));

  const userContext = useContext(UserContext);

  const handleLogin = async (credentials) => {
    setLoginModal((prev) => ({ ...prev, loading: true }));
    await userContext
      .handleLogin(credentials)
      .then(() => {
        setLoginModal(() => ({ show: false, loading: false, fail: false }));
      })
      .catch(() => {
        setLoginModal(() => ({ show: true, loading: false, fail: true }));
      });
  };

  const handleRegistration = async (credentials) => {
    setRegistryModal((prev) => ({ ...prev, loading: true }));
    await register(credentials)
      .then(() => {
        setRegistryModal((prev) => ({
          ...prev,
          loading: false,
          fail: false,
          success: true,
        }));
      })
      .catch(() => {
        setRegistryModal((prev) => ({
          ...prev,
          loading: false,
          fail: true,
          success: false,
        }));
      });
  };

  return (
    <>
      {userContext.isLogged ? (
        <Dropdown overlay={userMenu(userContext.handleLogout)} trigger="click">
          <UserHeader />
        </Dropdown>
      ) : (
        <>
          <HeaderButton onClick={showRegistryModal}>Register</HeaderButton>
          <HeaderButton onClick={showLoginModal}>Login</HeaderButton>

          <Modal
            title="Login"
            visible={loginModal.show}
            onCancel={hideLoginModal}
            centered
            footer={null}
          >
            <AuthForm
              submitButton="Login"
              onSubmit={handleLogin}
              isLoading={loginModal.loading}
            >
              {loginModal.fail && (
                <Typography.Text type="danger">
                  User with this login and password does not exist
                </Typography.Text>
              )}
            </AuthForm>
          </Modal>

          <Modal
            title="Register"
            visible={registryModal.show}
            onCancel={hideRegistryModal}
            centered
            footer={null}
          >
            <AuthForm
              submitButton="Register"
              onSubmit={handleRegistration}
              isLoading={registryModal.loading}
            >
              {registryModal.success && (
                <Typography.Text type="success">
                  Registration success. Try to log in using your credentials.
                </Typography.Text>
              )}
              {registryModal.fail && (
                <Typography.Text type="danger">
                  Registration failed
                </Typography.Text>
              )}
            </AuthForm>
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
  height: fit-content;
`;
