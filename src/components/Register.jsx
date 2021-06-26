import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { createUser } from '../api';
import './css/Register.css';

const Register = ( ) => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onRegisterSubmit = (event) => {
        event.preventDefault()
        createUser()
    }

    return (
      <>
        <Form id="form" 
              autoComplete="Off" 
              style={{width: "15em"}}
              onSubmit={onRegisterSubmit}>

            <Form.Group>
              <Form.Label>Username</Form.Label>
                <Form.Control 
                    id="username"
                    type="username" 
                    placeholder="username" 
                    onInput={(event) => {
                        setUsername(event.target.value)
                    }}/>
                </Form.Group>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    id="email"
                    type="email" 
                    placeholder="Enter email"
                    onInput={(event) => {
                        setEmail(event.target.value)
                    }} />
                </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
                <Form.Control
                    id="password" 
                    type="password" 
                    placeholder="Password"
                    onInput={(event) => {
                        setPassword(event.target.value)
                    }} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </>
    )
}

export default Register