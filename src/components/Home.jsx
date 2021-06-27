import React from "react";
import "./css/Home.css";
import { Row } from "react-bootstrap";
import Product from "./Product"

const Home = ({ products }) => {
  return (
    <>
      <div className="home">HOME</div>
      <Row>
        {products.products &&
          products.products.map((product, idx) => {
            return (
              <Product key={idx} product={product} />
            );
          })}
      </Row>
    </>
  );
};

export default Home;
