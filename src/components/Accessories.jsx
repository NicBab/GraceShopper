import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./css/Accessories.css";
import { getAllProducts } from "../api";
import { InfoIcon } from './icons'
import {useCart} from "react-use-cart";

const Accessories = ({ products }) => {
    //question for instructor -- better to use props here? or api endpoint getAllProducts()?
  const [allAccessories, setAllAccessories] = useState();
  const { addItem } = useCart();
  const [showAccessoryInfo, setShowAccessoryInfo] = useState(false)

  const getAllAccessories = async () => {
    const products = await getAllProducts()
    try {
      let allAccessories = products.products.filter((product) => {
        return product.category.toLowerCase().includes("accessories");
      });
      setAllAccessories(allAccessories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllAccessories();
  }, []);

  return ( 
    <>

      <div className="accessories">Accessories</div>
      {allAccessories
        ? allAccessories.map((accessory) => {
            return (
              <Row>
                <Col>
                  <Card
                    className="accessoryPgCard ml-4 mb-4"
                    key={accessory.id}
                    style={{ width: "18rem" }}
                  >
                    <Card.Img variant="top" src={accessory.img_url} />
                    <Card.Body>
                      <Card.Title>{accessory.name}</Card.Title>
                      {showAccessoryInfo && 
               (<Card.Text>{accessory.description}</Card.Text>)}
              <h6 className="card-subtitle">${accessory.price}</h6>
              <br></br>
              <Button variant="primary">Add to cart</Button>
              <Button onClick={() => setShowAccessoryInfo(!showAccessoryInfo)} style={{marginLeft: "5em"}} variant="light"> { InfoIcon } </Button>
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

export default Accessories;
