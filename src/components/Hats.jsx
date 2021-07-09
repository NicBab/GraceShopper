import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./css/Hats.css";
import { getAllProducts } from "../api";
import Product from "./Product";

const Hats = ({addToCart}) => {
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
        ? allHats.map((product) => {
            return (
              <Row id="items">
                <Col>
                  <Product product={product} addToCart={addToCart} />
                </Col>
              </Row>
            );
          })
        : null}
    </>
  );
};

export default Hats;
 