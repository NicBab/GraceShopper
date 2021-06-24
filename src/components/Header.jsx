import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
      <header id="header">
        <h1>Hello Shoes</h1>

         <nav className="page-select">

          <button>
            <Link to="/home" activeclassname="current">
              HOME
            </Link>
          </button>

          <button>
            <Link to="/shoes" activeclassname="current">
              SHOES
            </Link>
          </button>

          <button>
            <Link to="/hats" activeclassname="current">
              HATS
            </Link>
          </button>

          <button>
            <Link to="/accessories" activeclassname="current">
              ACCESSORIES
            </Link>
          </button>

          <button>
            <Link to="/admin" activeclassname="current">
              ADMIN
            </Link>
          </button>

        </nav>
      </header>
  );
};

export default Header;
