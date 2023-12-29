import React from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "@dynatrace/strato-components-preview";

export const Header = () => {
  return (
    <AppHeader>
      <AppHeader.NavItems>
        <AppHeader.AppNavLink appName="Entity Selector Architect" as={Link} to="/"/>
      </AppHeader.NavItems>
    </AppHeader>
  );
};
