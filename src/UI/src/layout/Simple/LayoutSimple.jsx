import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../../pages/SearchPage/SearchPage";
import { FoodDetails } from "../../pages/FoodDetails/FoodDetails";
import styled from "styled-components";
import { useState } from "react";
import { AboutPage } from "../../pages/AboutPage/AboutPage";
import { MealCreatorPage } from "../../pages/MealCreator/MealCreatorPage";
import { NutrientHeader } from "../../components/NutrientHeader/NutrientHeader";
import Footer from "../../components/Footer/Footer";

const { Content, Sider } = Layout;

const NutrientInfoLayout = styled(Layout)`
  background: #fff;
`;

const PageContainer = styled.div`
  min-height: 80vh;
  padding: "0 10px";
`;

function LayoutSimple() {
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
                <Route path="/food-details/:foodId">
                  <FoodDetails></FoodDetails>
                </Route>
                <Route path="/about" component={AboutPage}></Route>
                <Route path="/meal-creator" component={MealCreatorPage}></Route>
                <Route path="/">
                  <SearchPage></SearchPage>
                </Route>
              </Switch>
            </PageContainer>
          </Content>
          <Footer />
        </NutrientInfoLayout>
      </NutrientInfoLayout>
    </Router>
  );
}

export default LayoutSimple;
