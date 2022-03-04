import { useState } from "react";
import { AuthModal } from "../User/AuthModal/AuthModal";
import styled from "styled-components";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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

  const handleAuth = (values) => {
    console.log(values);
    setWaitingForAuth(true);

    Promise.resolve(auth(values))
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
    const action = modalType === "login" ? "login" : "register";

    const response = await axios.post(
      `${apiBaseUrl}user/${action}`,
      credentials,
      { withCredentials: true }
    );
    console.log(response);
    localStorage.setItem("jwtToken", response.data.token);
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
