import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PizzaListing from "./containers/PizzaListing";
import CartListing from "./containers/CartListing";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={PizzaListing} exact />
      <Route path="/cart" component={CartListing} exact />
    </Switch>
  </BrowserRouter>
);
