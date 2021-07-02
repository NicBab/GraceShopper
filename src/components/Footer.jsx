import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap'
import { FaceBookIcon, InstaIcon, GitHubIcon } from './icons'

const Footer = () => {
    return (
      <Container className="d-flex align-items-start justify-content-around mt-10" 
        style={{minHeight: "25vh", marginTop: "10px"}}>
          <div>
          { FaceBookIcon } 
          </div>
          <div>
          { InstaIcon }
          </div>
          <div>
          { GitHubIcon }
          </div>
      </Container>
    )
}

export default Footer