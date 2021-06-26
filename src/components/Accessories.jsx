import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../api'
import './Accessories.css'


const Accessories= () => {

    return (
        <>
        {/* <div className="accessories">Accessories</div>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180"/>
             <Card.Body>
              <Card.Title>{product.name}Name</Card.Title>
                <Card.Text>{product.description}description</Card.Text>
                <Card.Text>{product.SKU}sku</Card.Text>
                <Card.Text>{product.price}Price</Card.Text>
              <Link to="/MyCart"><Button variant="primary">Add to Cart</Button></Link>
            </Card.Body>
          </Card> */}
        </>
    )
}
export default Accessories;