import { Layout, Divider, Menu } from "antd";
import {
  DesktopOutlined,
  InfoCircleOutlined,
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

function LayoutSimple(params) {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}>
        <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
          <Menu.Item key='1' icon={<DesktopOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key='2' icon={<InfoCircleOutlined />}>
            About
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='layout'>
        <Router>
          <Header className='header'>
            <div className='menu'>
              <MenuOutlined onClick={toggle} />
            </div>
            <Link to='/'>
              <div className='logo'>Nutrient Info</div>
            </Link>
          </Header>
          <Content>
            <PageContainer>
              <Switch>
                <Route path='/food-details/:foodId'>
                  <FoodDetails></FoodDetails>
                </Route>
                <Route path='/'>
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
            <a href='https://www.freepik.com' title='Freepik'>
              {" "}
              Freepik
            </a>{" "}
            from
            <a href='https://www.flaticon.com/' title='Flaticon'>
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
