import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./css/Hats.css";
import { getAllProducts } from "../api";
import { InfoIcon } from './icons'
import { CartProvider} from "react-use-cart";

const Hats = () => {
  //question for instructor -- better to use props here? or api endpoint getAllProducts()?
  const [allHats, setAllHats] = useState();

  const getAllHats = async () => {
    try {
      const products = await getAllProducts()
      let allHats = products.products.filter((product) => {
        return product.category.toLowerCase().includes("hats");
      });
      setAllHats(allHats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllHats();
  }, []);

  return (
    <>
      <div className="hats">Hats</div>
      {allHats
        ? allHats.map((hat) => {
            return (
              <Row>
                <Col>
                  <Card
                    className="hatPgCard ml-4 mb-4"
                    key={hat.id}
                    style={{ width: "18rem" }}
                  >
                    <Card.Img variant="top" src={hat.img_url} />
                    <Card.Body>
                      <Card.Title>{hat.name}</Card.Title>
                      <Card.Text>{hat.description}</Card.Text>
                      <Card.Text>{hat.price}</Card.Text>
                      <Link to="/MyCart">
                        <Button variant="primary">Add to Cart</Button>
                        </Link>
                        <Button style={{marginLeft: "5em"}} variant="light">{ InfoIcon } </Button>
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

export default Hats;
 