import React from "react";
import { Route } from "react-router-dom";
// import {
//     Home,
//     Shoes,
//     Hats,
//     Accessories
// } from "./components";

import Home from "./Home";
import Shoes from "./Shoes";
import Hats from "./Hats";
import Accessories from "./Accessories";

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
    </>
  );
};

export default Pages;