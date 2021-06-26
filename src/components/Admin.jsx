import React from 'react';
import './css/Admin.css';

const Admin = () => {
    return (
        <div className="admin">Admin</div>
    )
}

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