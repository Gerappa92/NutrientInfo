import { Layout, Menu, Typography } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Unauthorized } from "../../components/Unathorized/Unauthorized";
import { UserOverview } from "../../components/User/UserOverview/UserOverview";
import { DeleteAccount } from "../../components/User/DeleteAccount/DeleteAccount";
import { useContext } from "react";
import { UserContext } from "../../App";
import styled from "styled-components";

const { Sider, Content } = Layout;

export const UserPage = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      {userContext.user && userContext.user.isLogged ? (
        <Router>
          <Layout>
            <Sider breakpoint="lg" collapsedWidth="0">
              <Menu>
                <Menu.Item key="overview">
                  <Link to={"/user-settings/overview"}>
                    <Typography.Text>Overview</Typography.Text>
                  </Link>
                </Menu.Item>
                <Menu.Item key="delete">
                  <Link to={"/user-settings/delete-account"}>
                    <Typography.Text>Delete account</Typography.Text>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
              <Switch>
                <ContentDiv>
                  <Route
                    path="/user-settings/overview"
                    component={UserOverview}
                  ></Route>
                  <Route
                    path="/user-settings/delete-account"
                    component={DeleteAccount}
                  ></Route>
                </ContentDiv>
              </Switch>
            </Content>
          </Layout>
        </Router>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

const ContentDiv = styled.div`
  display: flex;
  justify-content: center;
`;
