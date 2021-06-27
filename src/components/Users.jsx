import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";


const Users = ({users}) => {
// need to render admin: true / false on card
  return (
    <>
      <h1>Users</h1>
    {users.users ? users.users.map((user) => {
      return (

      <Card key={user.id} style={{ width: "18rem" }}>
        <Card.Header>{user.name}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>{user.email}</ListGroup.Item>
          <ListGroup.Item>Admin: {user.admin ? "yes" : "no"}</ListGroup.Item>
        </ListGroup>
      </Card>

      )

    }) : null}
    </>
  );
};

export default Users;