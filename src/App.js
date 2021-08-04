import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "./Components/Logout";
import NotFound from "./Components/NotFound404";
import DashboardContainer from "./Containers/DashboardContainer";
import AddnewsContainer from "./Containers/AddNewsContainer";
import EditnewsContainer from "./Containers/EditNewsContainer";
import LoginContainer from "./Containers/LoginContainer";
import RegisterContainer from "./Containers/RegisterContainer";
import About from "./Components/About";
import PublicNewsContainer from "./Containers/PublicNewsContainer";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={PublicNewsContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/register" component={RegisterContainer} />
        <Route exact path="/about" component={About} />
        <Route exact path="/logout" component={Logout} />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={DashboardContainer}
        />
        <ProtectedRoute
          exact
          path="/dashboard/add"
          component={AddnewsContainer}
        />
        <ProtectedRoute
          exact
          path="/dashboard/edit/:id"
          component={EditnewsContainer}
        />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
