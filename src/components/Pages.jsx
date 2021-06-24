import React from "react";
import { Route } from "react-router-dom";

import {
    Home,
    Shoes,
    Hats,
    Accessories,
    Admin
} from "../components";


const Pages = () => {
  return (
    <>
      <Route exact path="/home">
        <Home />
      </Route>

      <Route exact path="/shoes">
        <Shoes />
      </Route>

      <Route exact path="/hats">
        <Hats />
      </Route>

      <Route exact path="/accessories">
        <Accessories />
      </Route>

      <Route exact path="/admin">
        <Admin />
      </Route>
    </>
  );
};

export default Pages;