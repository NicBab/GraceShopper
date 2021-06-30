import React from "react";
import { Route } from 'react-router-dom'
import { Navigate } from '../components'
import "./css/Header.css";

const Header = () => {

  return (
    <Route>
      <div>
        <Navigate />
      </div>
    </Route>
      
  );
};

export default Header;


