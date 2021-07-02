import React from "react";
import { Route } from 'react-router-dom'
import { Navigate } from '../components'
import "./css/Header.css";

const Header = ({loggedIn, setLoggedIn, logout}) => {

  return (
    <Route>
      <div>
        <Navigate loggedIn={loggedIn} setLoggedIn={setLoggedIn} logout={logout} />
      </div>
    </Route>
      
  );
};

export default Header;


