import { useState } from "react";
import { AuthModal } from "../User/AuthModal/AuthModal";
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

  const handleAuth = (values) => {
    console.log(values);
    setWaitingForAuth(true);
    setTimeout(() => {
      setWaitingForAuth(false);
      setIsModalVisible(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
