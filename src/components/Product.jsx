import React, { useState } from "react";
import "./css/Home.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoIcon, CartIcon } from './icons';
// import { response } from "express";


const Product = ({ product, products, setProducts, cart, setCart, addToCart}) => {
  const[showProductInfo, setShowProductInfo] = useState(false);
  const [newproduct, addNewProduct] = useState([]);


  const addProduct = async () => {
  // const addedItem = { 
  //   product_id = product.id, 
  //   product_name = product.name,
  //   product_quantity = 1,
  //   product_price = product.price,

  // }

  try{
    const response = await (`${process.env.REACT_APP_GRACE_SHOPPER}/MyCart/addItems`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     }, body: JSON.stringify({})
    });
    const data = await response.json();
    console.log(data);
   return data;
  }catch(error){
    console.log('Error Adding Item to Cart')
  }

  }
 


  return (
    <>
    {product.active ?
      <Row>
        <Col>
          <Card className="homePgCard ml-4 mb-4" bg="light" key={product.id} style={{ width: "18rem" }}>
            <Link to="/product/id">
              <Card.Img
                className="landscape"
                variant="top"
                style={{ maxHeight: "200px"  }}
                src={product.img_url}
              />
            </Link>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              {showProductInfo && 
               (<Card.Text>{product.description}</Card.Text>)}
              <h6 className="card-subtitle text-muted">${product.price}</h6>
              <br></br>
              <Button onClick={() =>{ addToCart(); addProduct(product);}} variant="primary">Add to cart</Button>
              {/* <Button onClick={() => addToCart(product)} variant="primary">Add to cart</Button> */}
              <Button onClick={() => setShowProductInfo(!showProductInfo)} style={{marginLeft: "5em"}} variant="light"> { InfoIcon } </Button>
            
            </Card.Body>
          </Card>
        </Col>
      </Row>
      : null}
    </>
  );
};

export default Product;
