import { Layout, Divider } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../../pages/SearchPage/SearchPage";
import { FoodDetails } from "../../pages/FoodDetails/FoodDetails";
import "./LayoutSimple.css";
import styled from "styled-components";

const { Header, Content, Footer } = Layout;

const PageContainer = styled.div`
  min-height: 80vh;
  background: #fff;
  padding: "0 10px";
`;

function LayoutSimple(params) {
  return (
    <Layout className="layout">
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
  );
}

export default LayoutSimple;
