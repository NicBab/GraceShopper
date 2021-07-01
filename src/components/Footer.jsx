import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap'
import { FaceBookIcon} from './icons'

const Footer = () => {
    return (
      <Container className="foot" style={{minHeight: "25vh"}}>
          <div>
            <Row>
            {FaceBookIcon}
            {FaceBookIcon}
            {FaceBookIcon}
            </Row>
          </div>
      </Container>
    )
}

export default Footer