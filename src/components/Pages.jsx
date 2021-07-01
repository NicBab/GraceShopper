import React from "react";
import { Route } from "react-router-dom";
import { AuthProvider } from '../contexts/AuthContext'

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
    MyOrders,
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
    <AuthProvider>
       <PrivateRoute exact path="/dashboard" component={Dashboard} />
       <PrivateRoute path="/update-profile" component={UpdateProfile} />

       <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/home">
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

        <Route exact path="/myorders">
          <MyOrders/>
        </Route>

        <Route exact path="/admin/users">
          <Users users={users} />
        </Route>

        <Route exact path="/admin/inventory">
          <Inventory products={products} setProducts={setProducts} />
        </Route>
      </AuthProvider>
    </>
  );
};

export default Pages;