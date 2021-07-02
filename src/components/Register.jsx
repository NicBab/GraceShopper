import React, { useState, useRef, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import './css/Register.css';
// import { SettingsBackupRestoreRounded } from '@material-ui/icons';

const Register = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { register } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [token, setToken] = useState()

  async function handleRegister(e) {
    e.preventDefault()
   
    if (passwordRef.current.value !==
      passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
      try {
        
        setError("")
        setLoading(true)
        await register(emailRef.current.value, passwordRef.current.value)
        history.push("/dashboard")

      } catch (error) {
        setError("Signup Failed!")
      }
      setLoading(false)
  }

  return (
       <Container 
          className="d-flex align-items-start justify-content-center" 
          style={{ minHeight: "100vh", marginTop: "5em"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleRegister}>
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                      </Form.Group>
                      <Form.Group id="password">
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                      </Form.Group>
                      <Form.Group id="password-confirm">
                        <Form.Label>password confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                      </Form.Group>
                      <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                  </Form>
              </Card.Body>
            </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login Here</Link>
          </div>
          <div className="w-100 text-center mt-2">
            <Link to="/">Return to home page</Link>
          </div>
        </div>
      </Container>
   )
}

export default Register
