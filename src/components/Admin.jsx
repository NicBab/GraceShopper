import React from 'react';
import './css/Admin.css';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <div className="admin">Admin</div>
      <div className="mb-2">
        <Link to="/admin/users">
          <Button className="users-btn" variant="secondary" size="lg">
            Users
          </Button>
        </Link>
        {" "}
        <Link to="/admin/inventory">
          <Button className="inventory-btn" variant="secondary" size="lg">
            Inventory
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Admin;