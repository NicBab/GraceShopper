import React from "react";
import { Route } from 'react-router-dom'
import { Navigate } from '../components'
import "./css/Header.css";

const Header = ({loggedIn, setLoggedIn, logout, cart, setCart}) => {

  return (
    <Route>
      <div>
        <Navigate loggedIn={loggedIn} setLoggedIn={setLoggedIn} logout={logout} cart={cart}
          setCart={setCart} />
      </div>
    </Route>
      
  );
};

export default Header;


