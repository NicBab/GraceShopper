import React from "react";
import "./css/Home.css";
import { Row } from "react-bootstrap";
import Product from "./Product";
import {CartProvider} from "react-use-cart";
import Landing from "./Landing"

const Home = ({ products, addToCart, cartItems, setCartItems, onAdd, userCart, setUserCart }) => {
  return (
    <>
    <CartProvider>
      <div className="landing-container">
        <Landing />
      </div>
      <div className="home">HOME</div>
      <hr/>
      <Row>
        {products.map((product, idx) => {
            return (
              <Product key={idx} product={product} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} onAdd={onAdd} userCart={userCart} setUserCart={setUserCart}/>
              );
            }).reverse()}
      </Row>
      </CartProvider>
    </>
  );
};

export default Home;
