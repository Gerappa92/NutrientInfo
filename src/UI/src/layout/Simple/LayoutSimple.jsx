import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../../pages/SearchPage/SearchPage";
import { FoodDetails } from "../../pages/FoodDetails/FoodDetails";
import "./LayoutSimple.css";

const { Header, Content, Footer } = Layout;

function LayoutSimple(params) {
  return (
    <Layout className="layout">
      <Router>
        <Header className="header">
          <Link to="/">
            <div className="logo">Nutrient Info</div>
          </Link>
        </Header>
        <Content style={{ padding: "0 10px" }}>
          <Switch>
            <Route path="/food-details/:foodId">
              <FoodDetails></FoodDetails>
            </Route>
            <Route path="/">
              <div className="site-layout-content">
                <SearchPage></SearchPage>
              </div>
            </Route>
          </Switch>
        </Content>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        Gerappa Design ©2021 Created by Krzysztof Juszcze
      </Footer>
    </Layout>
  );
}

export default LayoutSimple;
