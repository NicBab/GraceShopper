import React from 'react';
import { Form, Button } from 'react-bootstrap'
import './css/Login.css'

const Login = () => {
    return (
        <>
        <div className="log">Login</div>
        <Form style={{width: "15em"}}>
        <Form.Group controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </>
    )
}

export default Login;