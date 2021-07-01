import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Container, Alert, Form, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const UpdateProfile = () => {
    const [error, setError] = useState()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [loading, setLoading] = useState()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault() 

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
                return setError("Passwords do not match!")
            }

            const promises = []
              setLoading(true)
              setError("")
            if (emailRef.current.value !== currentUser.email) {
                promises.push(updateEmail(emailRef.current.value))
            }
            if (passwordRef.current.value) {
                promises.push(updatePassword(passwordRef.current.value))
            }

            Promise.all(promises).then(() => {
                history.push("/dashboard")
            }).catch(() => {
                setError("Failed to update account")
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
         <Container
          className="d-flex align-items-start justify-content-center" 
          style={{ minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                    { error && <Alert variant="danger">{error}</Alert> }
                  <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                          <Form.Control type="email" ref={emailRef} 
                          required defaultValue={currentUser.email} />
                      </Form.Group>
                      <Form.Group id="password">
                        <Form.Label>password</Form.Label>
                          <Form.Control type="password" ref={passwordRef} 
                               placeholder="Leave blank to keep the same" />
                      </Form.Group>
                      <Form.Group id="password-confirm">
                        <Form.Label>password confirmation</Form.Label>
                          <Form.Control type="password" ref={passwordConfirmRef} 
                             placeholder="Leave blank to keep the same" />
                      </Form.Group>
                      <Button disabled={loading} className="w-100" type="submit">Update</Button>
                  </Form>
              </Card.Body>
            </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/dashboard">Cancel</Link>
          </div>
          </div>
          </Container>
      </>
    )
}

export default UpdateProfile