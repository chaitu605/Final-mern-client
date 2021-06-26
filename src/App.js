import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import PublicNavigation from "./Components/PublicNavigation";
import Navigation from "./Components/Navigation";
import Logout from "./Components/Logout";
import EditNews from "./Components/EditNews";
import NotFound from "./Components/NotFound404";
import AddNews from "./Components/AddNews";

function App() {
  return (
    <React.Fragment>
      {sessionStorage.getItem("user_info") == null ? (
        <Navigation />
      ) : (
        <PublicNavigation />
      )}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/add" component={AddNews} />
        <Route exact path="/dashboard/edit/:id" component={EditNews} />
        <Route exact path="/logout" component={Logout} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
