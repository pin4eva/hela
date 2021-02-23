import DashboardLayout from "layouts/DashboardLayout";
import HomePage from "pages/home";
import ReportsPage from "pages/reports";
import SettingsPage from "pages/settings";
import SingleReport from "pages/SingleReport";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Authlayout from "./layouts/Authlayout";
import Errorpage from "./pages/Errorpage";
import LoginPage from "./pages/Login";
import SignupComp from "./pages/Signup";

interface IPage {
  //   component: React.ReactNode;
  //   layout: React.ReactNode;
  component: React.ElementType;
  layout: React.ElementType;
  path?: string;
  exact?: boolean;
  isAuth?: boolean;
  proctected: boolean;
}

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuth,
  proctected,
  ...rest
}: IPage): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (proctected) {
          if (isAuth) {
            return (
              <Layout>
                <Component {...props} />
              </Layout>
            );
          } else {
            return <Redirect to="/" />;
          }
        } else {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
      }}
    />
  );
};

const Routes = ({ isAuth }) => (
  <Router>
    <Switch>
      <AppRoute
        layout={Authlayout}
        proctected={false}
        component={LoginPage}
        path="/"
        exact
      />
      <AppRoute
        layout={Authlayout}
        proctected={false}
        component={SignupComp}
        path="/register"
      />
      <AppRoute
        proctected={true}
        layout={DashboardLayout}
        component={HomePage}
        path="/home"
        isAuth={isAuth}
      />
      <AppRoute
        proctected={true}
        isAuth={isAuth}
        layout={DashboardLayout}
        component={ReportsPage}
        exact
        path="/reports"
      />
      <AppRoute
        proctected={true}
        isAuth={isAuth}
        layout={DashboardLayout}
        component={SingleReport}
        path="/reports/:slug"
      />
      <AppRoute
        proctected={true}
        isAuth={isAuth}
        layout={DashboardLayout}
        component={SettingsPage}
        path="/settings"
      />

      <AppRoute proctected={false} component={Errorpage} layout={Authlayout} />
    </Switch>
  </Router>
);

export default Routes;
