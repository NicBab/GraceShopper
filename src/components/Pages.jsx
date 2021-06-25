import React from "react";
import { Route } from "react-router-dom";

import {
    Home,
    Shoes,
    Hats,
    Accessories,
    Admin,
    Register,
    Login,
    MyCart,
    MyProfile
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

      <Route exact path="/register">
        <Register />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/mycart">
        <MyCart />
      </Route>

      <Route exact path="/myprofile">
        <MyProfile/>
      </Route>
    </>
  );
};

export default Pages;