import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./css/Shoes.css";
import { getAllProducts } from "../api";
import { InfoIcon } from './icons'
import Product from "./Product"

const Shoes = ({ products, addToCart }) => {
    //question for instructor -- better to use props here? or api endpoint getAllProducts()?
  const [allShoes, setAllShoes] = useState();


  const getAllShoes = async () => {
    const products = await getAllProducts()
    try {
      let allShoes = products.filter((product) => {
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
        ? allShoes.map((product) => {
            return (
              <Row>
                <Col>
                  <Product className="mb-4" product={product} addToCart={addToCart} />
                </Col>
              </Row>
            );
          })

        : null}
    </>
  );
};

export default Shoes;
