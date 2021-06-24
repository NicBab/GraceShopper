import React from 'react'
import './Header.css'
import {
    BrowserRouter as Router,
    NavLink
} from "react-router-dom";

const Header = () => {
    return (
        <Router>
          <header id="header">
             <h1>Hello Shoes</h1>
              <nav className="page-select">
                <button><NavLink to="/Home" activeClassName="current">HOME</NavLink></button>
                <button><NavLink to="/SHOES" activeClassName="current">SHOES</NavLink></button>
                <button><NavLink to="/HATS" activeClassName="current">HATS</NavLink></button>
                <button><NavLink to="/ACCESSORIES" activeClassName="current">ACCESSORIES</NavLink></button>
              </nav>
            </header>
        </Router>
    )
}

export default Header