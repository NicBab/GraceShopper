import React from 'react';
import { Link } from 'react-router-dom'
import { DropdownButton, Dropdown} from 'react-bootstrap'
import './Navigate.css';

const Navigate= () => {
    return (
      <>
      <DropdownButton id="dropdown-item-button" title="Browse the Store">
      <Link to="/home"><Dropdown.Item as="button">Home</Dropdown.Item></Link>
      <Link to="/shoes"><Dropdown.Item as="button">Shoes</Dropdown.Item></Link>
      <Link to="/hats"><Dropdown.Item as="button">Hats</Dropdown.Item></Link>
      <Link to="/accessories"><Dropdown.Item as="button">Accessories</Dropdown.Item></Link>
      <Link to="/admin"><Dropdown.Item as="button">Admin</Dropdown.Item></Link>
      <Link to="/hats"><Dropdown.Item as="button">Log-In</Dropdown.Item></Link>
      <Link to="/hats"><Dropdown.Item as="button">Register</Dropdown.Item></Link>
      <Link to="/MyCart"><Dropdown.Item as="button">MyCart</Dropdown.Item></Link>
      </DropdownButton>
      </>
    )
}

export default Navigate

// import { Link } from "react-router-dom";
// import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
  // {/* <Navbar bg="dark" variant="dark" id="navlinks">
  //   <Nav className="mr-auto">
  //     <Link to="/home" id="homeLink">HOME</Link>
  //     <Link to="/shoes" id="shoeLink">SHOES</Link>
  //     <Link to="/hats" id="hatLink">HATS</Link>
  //     <Link to="/accessories" id="accLink">ACCESSORIES</Link>
  //     <Link to="/admin" id="adminLink">ADMIN</Link>
  //   </Nav>

  //   <Form inline>
  //     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
  //     <Button variant="outline-light">Search</Button>
  //   </Form>
    
  // </Navbar>