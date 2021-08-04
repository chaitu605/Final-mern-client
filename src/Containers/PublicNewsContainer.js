import React from "react";
import PublicNavigation from "../Components/PublicNavigation";
import PublicNews from "../Components/PublicNews";

export default function PublicNewsContainer() {
  return (
    <React.Fragment>
      <PublicNavigation />
      <PublicNews />
    </React.Fragment>
  );
}
