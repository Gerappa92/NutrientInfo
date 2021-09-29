import { Layout } from "antd";
import SearchPage from "../../pages/SearchPage/SearchPage";
import "./LayoutSimple.css";

const { Header, Content, Footer } = Layout;

function LayoutSimple(params) {
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">Nutrient Info</div>
      </Header>
      <Content style={{ padding: "0 10px" }}>
        <div className="site-layout-content">
          <SearchPage></SearchPage>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Gerappa Design ©2021 Created by Krzysztof Juszcze
      </Footer>
    </Layout>
  );
}

export default LayoutSimple;
