import React from "react";
import PublicNavigation from "../Components/PublicNavigation";
import Login from "../Components/Login";

export default function LoginContainer() {
  return (
    <React.Fragment>
      <PublicNavigation />
      <Login />
    </React.Fragment>
  );
}
