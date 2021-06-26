import React from "react";
import { Navigate } from '../components'
import "./css/Header.css";

const Header = () => {

  return (
      <div id="head">
        <h1>Ooo... SHOES!!!</h1>
        <h2>Something for Pete & Joe!!</h2>
        <Navigate />
      </div>
  );
};

export default Header;


