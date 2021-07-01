import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap'
import { FaceBookIcon, InstaIcon } from './icons'

const Footer = () => {
    return (
      <Container className="foot" style={{minHeight: "25vh"}}>
          <div>
            <Row style={{marginLeft: "10px"}}>
            {FaceBookIcon}
            <Row style={{marginLeft: "10px"}}>
            {InstaIcon}
            </Row>
            </Row>
            
          </div>
      </Container>
    )
}

export default Footer