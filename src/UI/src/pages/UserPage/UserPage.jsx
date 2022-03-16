import { Layout, Menu, Typography } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import { UserOverview } from "../../components/User/UserOverview/UserOverview";
import { DeleteAccount } from "../../components/User/DeleteAccount/DeleteAccount";
import { ResetPassword } from "../../components/User/ResetPassword/ResetPassword";
import styled from "styled-components";

const { Sider, Content } = Layout;

export const UserPage = () => {
  return (
    <>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu>
            <Menu.Item key="overview">
              <Link to={"/user-settings/overview"}>
                <Typography.Text>Overview</Typography.Text>
              </Link>
            </Menu.Item>
            <Menu.Item key="reset-password">
              <Link to={"/user-settings/reset-password"}>
                <Typography.Text>Reset password</Typography.Text>
              </Link>
            </Menu.Item>
            <Menu.Item key="delete">
              <Link to={"/user-settings/delete-account"}>
                <Typography.Text>Delete account</Typography.Text>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ backgroundColor: "white" }}>
          <Switch>
            <ContentDiv>
              <Route path="/user-settings/overview" component={UserOverview} />
              <Route
                path="/user-settings/reset-password"
                component={ResetPassword}
              />
              <Route
                path="/user-settings/delete-account"
                component={DeleteAccount}
              />
            </ContentDiv>
          </Switch>
        </Content>
      </Layout>
    </>
  );
};

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 28px;
  height: 80vh;
`;
