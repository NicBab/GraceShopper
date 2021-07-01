
import React from "react";
import { Link } from "react-router-dom";
import { CartIcon, HeadIcon, HomeIcon } from "./icons";

// import React, { useState, } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { useAuth } from '../contexts/AuthContext'
// import { CartIcon, HeadIcon, HomeIcon, SearchIcon, GearIcon } from './icons'


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
import { auth } from "../firebase";

const Navigate = ({ currentUser, loggedIn, setLoggedIn, admin, setAdmin }) => {
  return (
    <>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/home">Oh Shoes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
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
            {/* {admin ? ( */}
              <Link to="/admin">
                <Nav.Link href="#link">Admin</Nav.Link>

// const Navigate = () => {
//   const [error, setError] = useState("")
//   const { logout } = useAuth()
//   const history = useHistory()

//   const handleLogout = async (e) => {
//       e.preventDefault()
//       setError("")
//     try {
//       await logout()
//       history.push("/")
//     } catch (error) {
//       setError("Failed to logout!")
//     }
//   }

//   return (
//     <>
//       <div>
//       <Navbar bg="light" expand="lg">
//           <Link to="/">
//             <Dropdown.Item as="button">{HomeIcon}</Dropdown.Item>
//           </Link>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//           <Form inline>
//             <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//             <Button variant="light">{SearchIcon}</Button>
//           </Form>
//             <NavDropdown title="Categories" id="basic-nav-dropdown">
//               <Link to="/shoes">
//                 <NavDropdown.Item href="#action/3.1">Shoes</NavDropdown.Item>
//               </Link>
//               <Link to="/hats">
//                 <NavDropdown.Item href="#action/3.2">Hats</NavDropdown.Item>

              </Link>
            {/* ) : null} */}
            <Link to="/home">
              <Dropdown.Item as="button">{HomeIcon}</Dropdown.Item>
            </Link>
            <Link to="/mycart">
              <Dropdown.Item as="button">{CartIcon}</Dropdown.Item>
            </Link>
            {loggedIn ? (
              <Link to="/dashboard">
                <Dropdown.Item as="button">{HeadIcon}</Dropdown.Item>
              </Link>
            ) : null}
            {loggedIn ? null : (
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

//             </NavDropdown>
//           </Nav>
//           <Link to="/admin">
//             <Dropdown.Item as="button">{GearIcon}</Dropdown.Item>
//           </Link>
//           <Link to="/dashboard">
//             <Dropdown.Item as="button">{HeadIcon}</Dropdown.Item>
//           </Link>
//           <Link to="/mycart">
//             <Dropdown.Item as="button">{CartIcon}</Dropdown.Item>
//           </Link>
//           <Link to="/register">
//             <Dropdown.Item as="button">Register</Dropdown.Item>
//           </Link>
//           <Link to="/login">
//             <Dropdown.Item as="button">Login</Dropdown.Item>
//           </Link>
//           <Link to="/">
//             <Dropdown.Item as="button" onClick={() => handleLogout}>Logout</Dropdown.Item>
//           </Link>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   </>

  );
};

export default Navigate;

// need to finish button toggle for admin/login/register 