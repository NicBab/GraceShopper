import React from "react";
import "./Admin.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Admin = ({users}) => {
  return (
    <>
      <div className="admin">Admin</div>
      <div className="mb-2">
        <Link to="/admin/users">
          <Button variant="secondary" size="lg">
            Users
          </Button>
        </Link>
        {"  "}
        <Link to="/admin/inventory">
          <Button variant="secondary" size="lg">
            Inventory
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Admin;
