import React from "react";
import Navigation from "../Components/Navigation";
import Dashboard from "../Components/Dashboard";

export default function DashboardContainer() {
  return (
    <React.Fragment>
      <Navigation />
      <Dashboard />
    </React.Fragment>
  );
}
