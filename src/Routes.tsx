import React from "react"
import { Switch, Route } from "@chainsafe/common-components"
import HomePage from "./Components/Pages/HomePage"

export const ROUTE_LINKS = {
  Home: "/",
  Map: "/map",
  SoftwareStats: "/software-stats",
  NotFound: "404"
}

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTE_LINKS.Home} component={HomePage} />
      <Route exact path={ROUTE_LINKS.Map} component={HomePage} />
      <Route exact path={ROUTE_LINKS.SoftwareStats} component={HomePage} />
      <Route path={ROUTE_LINKS.NotFound} component={HomePage} />
    </Switch>
  )
}

export default Routes
