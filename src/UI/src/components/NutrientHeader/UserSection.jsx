import { useState } from "react";
import { AuthModal } from "../User/AuthModal/AuthModal";
import { login, register } from "../../modules/user-module";
import styled from "styled-components";

export const UserSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("register");
  const [waitingForAuth, setWaitingForAuth] = useState(false);

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
    console.log(values);
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
    } else {
      register(credentials);
    }
  };

  return (
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
  );
};

const HeaderButton = styled.p`
  color: white;
  margin: 0 10px;
  cursor: pointer;
`;
