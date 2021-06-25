import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../api'
import { Card, Button } from 'react-bootstrap'
import './Hats.css';

const Hats= () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
        <div className="hats">Hats</div>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180"/>
             <Card.Body>
              <Card.Title>{product.name}Name</Card.Title>
                <Card.Text>{product.description}description</Card.Text>
                <Card.Text>{product.SKU}sku</Card.Text>
                <Card.Text>{product.price}Price</Card.Text>
              <Link to="/MyCart"><Button variant="primary">Add to Cart</Button></Link>
            </Card.Body>
          </Card>
        </>
    )
}

export default Hats;