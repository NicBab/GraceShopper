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
    Dashboard,
    OrderHistory,
    Users,
    Inventory,
    PrivateRoute,
    UpdateProfile,
    ForgotPassword,
    Landing
} from "../components";


const Pages = ({products, setProducts, users, setUsers}) => {
  return (
    <>
       <PrivateRoute exact path="/dashboard" component={Dashboard} />
       <PrivateRoute path="/update-profile" component={UpdateProfile} />
       <PrivateRoute path="/admin" component={Admin} />
       <PrivateRoute path="/inventory" component={Inventory} />


        <Route exact path="/">
          <Home products={products} />
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
          <Admin setProducts={setProducts} />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>

        <Route exact path="/mycart">
          <MyCart />
        </Route>

        <Route exact path="/order-history">
          <OrderHistory/>
        </Route>

        {/* <Route exact path="/admin/users">
          <Users users={users} />
        </Route>

        <Route exact path="/admin/inventory">
          <Inventory products={products} setProducts={setProducts} />
        </Route> 
     */}
    </>
  );
};

export default Pages;