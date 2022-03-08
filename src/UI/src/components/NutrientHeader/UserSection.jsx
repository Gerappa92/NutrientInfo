import { useContext, useState } from "react";
import { Dropdown, Menu, Typography } from "antd";
import { AuthModal } from "../User/AuthModal/AuthModal";
import { login, register, logout } from "../../modules/user-module";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import styled from "styled-components";

const userMenu = (logout) => (
  <Menu>
    <Menu.Item key="logout" onClick={logout}>
      <Typography.Text>Log out</Typography.Text>
    </Menu.Item>
    <Menu.Item key="user-settings">
      <Link to="/user-settings">
        <Typography.Text>Settings</Typography.Text>
      </Link>
    </Menu.Item>
  </Menu>
);

export const UserSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("register");
  const [waitingForAuth, setWaitingForAuth] = useState(false);
  const userContext = useContext(UserContext);

  const showModal = (type) => {
    if (type === "login") {
      setModalType("login");
      setIsModalVisible(true);
    } else {
      setModalType("register");
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAuth = async (values) => {
    setWaitingForAuth(true);

    await auth(values)
      .then(() => {
        setWaitingForAuth(false);
        setIsModalVisible(false);
      })
      .catch((e) => {
        console.error(e);
        setWaitingForAuth(false);
      });
  };

  const auth = async (credentials) => {
    if (modalType === "login") {
      login(credentials);
      userContext.setUser({ isLogged: true });
    } else {
      register(credentials);
    }
  };

  const handleLogout = () => {
    userContext.setUser({
      isLogged: false,
    });
    logout();
  };

  return (
    <>
      {userContext.user.isLogged ? (
        <div>
          <Dropdown overlay={userMenu(handleLogout)}>
            <UserHeader />
          </Dropdown>
        </div>
      ) : (
        <>
          <HeaderButton onClick={() => showModal("register")}>
            Register
          </HeaderButton>
          <HeaderButton onClick={() => showModal("login")}>Login</HeaderButton>

          <AuthModal
            isVisible={isModalVisible}
            type={modalType}
            handleCancel={handleCancel}
            handleAuth={handleAuth}
            isLoading={waitingForAuth}
          />
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
`;
