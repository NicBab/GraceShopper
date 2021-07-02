import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const { resetPassword } = useAuth()
    const emailRef = useRef()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check email for instructions")
        } catch (error) {
          console.error("Failed to reset password")
        }
        setLoading(false)
    }


    return (
        <>
        <Container 
          className="d-flex align-items-start justify-content-center mt-10" 
          style={{ minHeight: "100vh", marginTop: "5em"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                      {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" ref={emailRef} required />
                      </Form.Group>
                      <Button 
                          disabled={loading} 
                          className="w-100" 
                          type="submit">Reset Password
                      </Button>
                  </Form>
                  <div className="w-100 text-center mt-3">
                      <Link to="/login">Login</Link>
                  </div>
              </Card.Body>
            </Card>
          <div className="w-100 text-center mt-2">
              Need an account? <Link to="/register">Sign Up here</Link> 
          </div>
          </div>
          </Container>
      </>
    )
}

export default ForgotPassword