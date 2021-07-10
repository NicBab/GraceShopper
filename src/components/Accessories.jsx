import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./css/Accessories.css";
import { getAllProducts } from "../api";
import Product from "./Product";

const Accessories = ({ products, addToCart }) => {
    //question for instructor -- better to use props here? or api endpoint getAllProducts()?
  const [allAccessories, setAllAccessories] = useState();

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
      <div class="item-container">
      <Row id="items">
      {allAccessories
        ? allAccessories.map((product) => {
            return (
              
                <Col>
                  <Product product={product} addToCart={addToCart} />
                </Col>
              
            );
          })
        : null}
        </Row>
        </div>
    </>
  );
};

export default Accessories;
