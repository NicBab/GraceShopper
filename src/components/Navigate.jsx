import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { CartIcon, HeadIcon, HomeIcon } from "./icons";
import "./css/Navigate.css";
import { useAuth } from '../contexts/AuthContext'
import { SearchIcon, GearIcon } from './icons'
import OhShoesLogo from "../img/oh-shoes-logo.png"
import {
  Dropdown,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import "./css/Navigate.css";


// function Products({cart, setCart}) {
// const handleAddItem = useCallback(event => {
//   addToCart(event.target.value)
// }, [addToCart])
// }



const Navigate = ({ loggedIn, setLoggedIn, admin, setAdmin, logout, cart, setCart}) => {
const{ currentUser } = useAuth()
const [error, setError] = useState("")
const history = useHistory()
const [showLogout, setShowLogout] = useState(!!currentUser);



useEffect(() => {
  setShowLogout(!!currentUser)
}, [currentUser])


  const handleLogout = async (e) => {
    e.preventDefault()
    setError("")
console.log("logout")
    try {
      await logout()
      history.push("/")
    } catch (error) {
      setError("Failed to logout!")
    }
  }

  return (
    <>

      <div>
        <Navbar bg="light" expand="lg">
          <Link to="/">
            <img className="os-logo" src={OhShoesLogo}></img>
           </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="light">{SearchIcon}</Button>
              </Form>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <Link to="/shoes">
                  <NavDropdown.Item href="#action/3.1">Shoes</NavDropdown.Item>
                </Link>
                <Link to="/hats">
                  <NavDropdown.Item href="#action/3.2">Hats</NavDropdown.Item>
                </Link>
                <Link to="/accessories">
                  <NavDropdown.Item href="#action/3.3">
                    Accessories
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
            <Link to="/admin">
              <Dropdown.Item as="button">{GearIcon}</Dropdown.Item>
            </Link>
            <Link to="/dashboard">
              <Dropdown.Item as="button">{HeadIcon}</Dropdown.Item>
            </Link>
            <Link to="/mycart">
              <Dropdown.Item as="button">{CartIcon}({cart.length})</Dropdown.Item>
            </Link>
                { showLogout ? (
                    <Link to="/">
                    <Dropdown.Item onClick={handleLogout} as="button">Logout</Dropdown.Item>
                    </Link>
                )
                :
                (
                  <>
                    <Link to="/register">
                    <Dropdown.Item as="button">Register</Dropdown.Item>
                  </Link>

                  <Link to="/login">
                    <Dropdown.Item as="button">Login</Dropdown.Item>
                  </Link>
                  </>
                )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Navigate;

// need to finish button toggle for admin/login/register
