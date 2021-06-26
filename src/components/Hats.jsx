import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import './css/Hats.css';

const Hats = ({products}) => {

    return (
        <>
        <div className="hats">Hats</div>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180"/>
             <Card.Body>
              <Card.Title>Name</Card.Title>
                <Card.Text>description</Card.Text>
                <Card.Text>sku</Card.Text>
                <Card.Text>Price</Card.Text>
              <Link to="/MyCart"><Button variant="primary">Add to Cart</Button></Link>
            </Card.Body>
          </Card>
        </>
    )
}

export default Hats;