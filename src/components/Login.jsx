import React, { useState, useRef, } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'

const Login = () => {
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const emailRef = useRef()
    const passwordRef = useRef()
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            
        } catch (error) {
            console.error("Failed to sign in!")
        }
    }


    return (
      <>
        <Container 
          className="d-flex align-items-center justify-content-center" 
          style={{ minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button 
                                disabled={loading} 
                                className="w-100" 
                                type="submit">Login
                            </Button>
                            </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                    </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up here</Link> 
                </div>
                <div className="w-100 text-center mt-2">
                    <Link to="/home">Return to home page</Link>
                </div>
            </div>
         </Container>
      </>
    )
}

export default Login 
