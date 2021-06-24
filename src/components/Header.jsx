import React from "react";
import "./Header.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Header = () => {
  return (
      <header id="header">
        <h1>Hello Shoes</h1>
        <nav className="page-select">
          <button>
            <Link to="/home" activeClassName="current">
              HOME
            </Link>
          </button>
          <button>
            <Link to="/shoes" activeClassName="current">
              SHOES
            </Link>
          </button>
          <button>
            <Link to="/hats" activeClassName="current">
              HATS
            </Link>
          </button>
          <button>
            <Link to="/accessories" activeClassName="current">
              ACCESSORIES
            </Link>
          </button>
          <button>
            <Link to="/admin" activeClassName="current">
              ADMIN
            </Link>
          </button>
        </nav>
      </header>
  );
};

export default Header;
