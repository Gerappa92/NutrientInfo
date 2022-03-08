import { useContext, useState } from "react";
import { AuthModal } from "../User/AuthModal/AuthModal";
import { login, register } from "../../modules/user-module";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../App";
import styled from "styled-components";

export const UserSection = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("register");
  const [waitingForAuth, setWaitingForAuth] = useState(false);
  const userContext = useContext(UserContext);

  console.log(userContext);

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

  return (
    <>
      {userContext.user.isLogged ? (
        <div>
          <UserHeader />
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
