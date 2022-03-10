import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SearchPage from "../../pages/SearchPage/SearchPage";
import { FoodDetails } from "../../pages/FoodDetails/FoodDetails";
import styled from "styled-components";
import { useState } from "react";
import { AboutPage } from "../../pages/AboutPage/AboutPage";
import { NewMealPage } from "../../pages/NewMealPage/NewMealPage";
import { UserPage } from "../../pages/UserPage/UserPage";
import { NutrientHeader } from "../../components/NutrientHeader/NutrientHeader";
import Footer from "../../components/Footer/Footer";

const { Content, Sider } = Layout;

export const LayoutSimple = () => {
  const [collapsed, setCollapsed] = useState(true);

  const hideMenu = true;

  const onCollapse = (collapsed) => setCollapsed(collapsed);

  return (
    <Router>
      <NutrientInfoLayout hasSider={true}>
        <div hidden={hideMenu}>
          <Sider
            collapsedWidth={0}
            width={180}
            onCollapse={onCollapse}
            defaultCollapsed={true}
            collapsible
            trigger={collapsed ? <MenuOutlined /> : <CloseOutlined />}
          >
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<DesktopOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<InfoCircleOutlined />}>
                <Link to="/meal-creator">About</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
        <NutrientInfoLayout style={{ minWidth: "85vw" }}>
          <NutrientHeader></NutrientHeader>
          <Content>
            <PageContainer>
              <Switch>
                <Redirect exact from="/" to="/home" />
                <Route path="/food-details/:foodId" component={FoodDetails} />
                <Route path="/about" component={AboutPage}></Route>
                <Route path="/meal-creator" component={NewMealPage}></Route>
                <Route path="/user-settings" component={UserPage} />
                <Route path="/" component={SearchPage} />
              </Switch>
            </PageContainer>
          </Content>
          <Footer />
        </NutrientInfoLayout>
      </NutrientInfoLayout>
    </Router>
  );
};

const NutrientInfoLayout = styled(Layout)`
  background: #fff;
`;

const PageContainer = styled.div`
  min-height: 80vh;
  padding: "0 10px";
`;
