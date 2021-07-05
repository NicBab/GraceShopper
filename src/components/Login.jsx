import React, { useState, useRef, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const { login } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    
    const handleLogin = async (e) => {
        e.preventDefault()
       
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        } catch (error) {
          console.error("Failed to sign in!")
        }
        setLoading(false)
    }

    return (
        <Container 
          className="d-flex align-items-start justify-content-center mt-10" 
          style={{ minHeight: "100vh", marginTop: "5em"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
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
                    Need an account? <Link to="/register">Sign Up here</Link> 
                </div>
                <div className="w-100 text-center mt-2">
                    <Link to="/">Return to home page</Link>
                </div>
            </div>
         </Container>
    )
}

export default Login 
