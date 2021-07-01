import React from "react";
import { Link } from "react-router-dom";
import { CartIcon, HeadIcon, HomeIcon, SearchIcon } from './icons'

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

const Navigate = ({currentUser}) => {


  return (
    <>
      <div>
      <Navbar bg="light" expand="lg">
          <Link to="/">
            <Dropdown.Item as="button">{HomeIcon}</Dropdown.Item>
          </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
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
                <NavDropdown.Item href="#action/3.3">Accessories</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
          <Link to="/admin">
            <Nav.Link href="#link">Admin</Nav.Link>
          </Link>
          <Link to="/dashboard">
            <Dropdown.Item as="button">{HeadIcon}</Dropdown.Item>
          </Link>
          <Link to="/mycart">
            <Dropdown.Item as="button">{CartIcon}</Dropdown.Item>
          </Link>
         
          <Link to="/register">
            <Dropdown.Item as="button">Register</Dropdown.Item>
          </Link>
          <Link to="/login">
            <Dropdown.Item as="button">Login</Dropdown.Item>
          </Link>
          <Link to="/">
            <Dropdown.Item as="button">Logout</Dropdown.Item>
          </Link>

        </Navbar.Collapse>
      </Navbar>
    </div>
  </>
  );
};

export default Navigate;
