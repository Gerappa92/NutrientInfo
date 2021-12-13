import { Layout, Divider, Menu } from "antd";
import {
  DesktopOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../../pages/SearchPage/SearchPage";
import { FoodDetails } from "../../pages/FoodDetails/FoodDetails";
import "./LayoutSimple.css";
import styled from "styled-components";
import { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

const PageContainer = styled.div`
  min-height: 80vh;
  background: #fff;
  padding: "0 10px";
`;

function LayoutSimple() {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = (collapsed) => setCollapsed(collapsed);

  return (
    <Layout hasSider={true}>
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        width={180}
        onCollapse={onCollapse}
        collapsed={collapsed}
        trigger={collapsed ? <MenuOutlined /> : <CloseOutlined />}
      >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            About
          </Menu.Item>
        </Menu>
      </Sider>
      {/* todo: desktop width */}
      <Layout style={{ minWidth: "100vw" }}>
        <Router>
          <Header className="header">
            <Link to="/">
              <div className="logo">Nutrient Info</div>
            </Link>
          </Header>
          <Content>
            <PageContainer>
              <Switch>
                <Route path="/food-details/:foodId">
                  <FoodDetails></FoodDetails>
                </Route>
                <Route path="/">
                  <SearchPage></SearchPage>
                </Route>
              </Switch>
            </PageContainer>
          </Content>
        </Router>
        <Footer>
          Gerappa Design ©2021 Created by Krzysztof Juszcze
          <Divider />
          <div>
            {" "}
            Icons made by
            <a href="https://www.freepik.com" title="Freepik">
              {" "}
              Freepik
            </a>{" "}
            from
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutSimple;
