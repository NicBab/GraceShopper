import React from "react";
import "./css/Home.css";
import { Row } from "react-bootstrap";
import Product from "./Product";
import Landing from "./Landing"

const Home = ({ products, addToCart, cartItems, setCartItems, onAdd, userCart, setUserCart }) => {
  return (
    <>
      <div className="landing-container">
        <Landing />
      </div>
      <div className="home">HOME</div>
      <hr/>
      <div className="item-container">
      <Row id="items">
        {products.map((product, idx) => {
            return (
              <Product key={idx} product={product} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} onAdd={onAdd} userCart={userCart} setUserCart={setUserCart}/>
              );
            }).reverse()}
      </Row>
      </div>
    </>
  );
};

export default Home;

