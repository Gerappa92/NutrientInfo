import { Col, Menu, Row, Typography } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Unauthorized } from "../../components/Unathorized/Unauthorized";
import { UserOverview } from "../../components/User/UserOverview/UserOverview";
import { DeleteAccount } from "../../components/User/DeleteAccount/DeleteAccount";
import { useContext } from "react";
import { UserContext } from "../../App";

export const UserPage = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      {userContext.user && userContext.user.isLogged ? (
        <Router>
          <Row>
            <Col>
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
            </Col>
            <Col>
              <Switch>
                <Route
                  path="/user-settings/overview"
                  component={UserOverview}
                ></Route>
                <Route
                  path="/user-settings/delete-account"
                  component={DeleteAccount}
                ></Route>
              </Switch>
            </Col>
          </Row>
        </Router>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};
