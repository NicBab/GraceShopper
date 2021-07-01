import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./css/Shoes.css";
import { getAllProducts } from "../api";
import { useEffect } from "react";
// import { addToCart } from '../api';

const Shoes = ({ products }) => {
  const [allShoes, setAllShoes] = useState();

  /*
 const onAddToCart = (event) => {
        event.preventDefault()
        // addToCart()
        console.log('add to cart clicked')
        
    }
    */

  const getAllShoes = async () => {
    try {
      const products = await getAllProducts();
      let allShoes = products.products.filter((product) => {
        return product.category.toLowerCase().includes("shoes");
      });
      setAllShoes(allShoes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllShoes();
  }, []);

  return (
    <>
      <div className="shoes">Shoes</div>
      {allShoes
        ? allShoes.map((shoe) => {
            return (
              <Row>
                <Col>
                  <Card
                    className="shoePgCard mb-4"
                    key={shoe.id}
                    style={{ width: "18rem" }}
                  >
                    <Card.Img variant="top" src={shoe.img_url} />
                    <Card.Body>
                      <Card.Title>{shoe.name}</Card.Title>
                      <Card.Text>{shoe.description}</Card.Text>
                      <Card.Text>{shoe.price}</Card.Text>
                      <Link to="/MyCart">
                        <Button variant="primary">Add to Cart</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            );
          })
        : null}
    </>
  );
};

export default Shoes;
