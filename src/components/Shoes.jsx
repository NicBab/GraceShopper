import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./css/Shoes.css";
import { getAllProducts } from "../api";
import { useCart} from "react-use-cart";


const Shoes = ({ products }) => {
    //question for instructor -- better to use props here? or api endpoint getAllProducts()?
  const [allShoes, setAllShoes] = useState();
  const { addItem } = useCart();

  const getAllShoes = async () => {
    const products = await getAllProducts()
    try {
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
                    className="shoePgCard ml-4 mb-4"
                    key={shoe.id}
                    style={{ width: "18rem" }}
                  >
                    <Card.Img variant="top" src={shoe.img_url} />
                    <Card.Body>
                      <Card.Title>{shoe.name}</Card.Title>
                      <Card.Text>{shoe.description}</Card.Text>
                      <Card.Text>{shoe.price}</Card.Text>
                      <Link to="/MyCart">
                        <Button variant="primary" onClick={() => addItem(shoe)}>Add to Cart</Button>
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
