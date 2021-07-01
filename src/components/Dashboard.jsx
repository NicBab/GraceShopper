import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Container, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleLogout = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await logout()
      history.push("/home")
    } catch (error) {
      setError("Failed to logout!")
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
                  <h2 className="text-center mb-4">Dashboard</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                  <strong>Email: </strong>{currentUser.email}
                  <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                      Update Profile </Link>
                  <Link to="/" className="btn btn-primary w-100 mt-3">
                      Home </Link>
              </Card.Body>
            </Card> 
          <div className="w-100 text-center mt-2">
              <Button variant="outline-primary" onClick={handleLogout}>Log Out</Button>
          </div>
          </div>
          </Container>
      </>
   )
}

export default Dashboard
