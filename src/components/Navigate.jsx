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
        <Link to="/Register"><Dropdown.Item as="button">Register</Dropdown.Item></Link>
        <Link to="/Login"><Dropdown.Item as="button">Login</Dropdown.Item></Link>
        <Link to="/MyCart"><Dropdown.Item as="button">MyCart</Dropdown.Item></Link>
        <Link to="/MyProfile"><Dropdown.Item as="button">MyProfile</Dropdown.Item></Link>
      </DropdownButton>
      </>
    )
}

export default Navigate
