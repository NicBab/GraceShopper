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
    MyProfile,
    MyOrders,
    Users,
    Inventory
} from "../components";


const Pages = ({products, setProducts, users, setUsers}) => {
  return (
    <>
      <Route exact path="/home">
        <Home />
      </Route>

      <Route exact path="/shoes">
        <Shoes products={products} />
      </Route>

      <Route exact path="/hats">
        <Hats />
      </Route>

      <Route exact path="/accessories">
        <Accessories />
      </Route>

      <Route exact path="/admin">
        <Admin users={users} setProducts={setProducts} />
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

      <Route exact path="/myorders">
        <MyOrders/>
      </Route>

      <Route exact path="/admin/users">
        <Users users={users} />
      </Route>

      <Route exact path="/admin/inventory">
        <Inventory products={products} />
      </Route>
    </>
  );
};

export default Pages;