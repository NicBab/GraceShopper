import React from "react";
import "./css/Home.css";
import { Row } from "react-bootstrap";
import Product from "./Product";
import {CartProvider} from "react-use-cart";


const Home = ({ products }) => {
  return (
    <>
    <CartProvider>
      <div className="home">HOME</div>
      <Row>
        {products.products &&
          products.products.map((product, idx) => {
            return (
              <Product key={idx} product={product} />
            );
          })}
      </Row>
      </CartProvider>
    </>
  );
};

export default Home;
