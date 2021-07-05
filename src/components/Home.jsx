import React from "react";
import "./css/Home.css";
import { Row } from "react-bootstrap";
import Product from "./Product";
import {CartProvider} from "react-use-cart";


const Home = ({ products, addToCart, cartItems, setCartItems, onAdd, userCart, setUserCart }) => {
  return (
    <>
    <CartProvider>
      <div className="home">HOME</div>
      <Row>
        {products.products &&
          products.products.map((product, idx) => {
            return (
              <Product key={idx} product={product} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} onAdd={onAdd} userCart={userCart} setUserCart={setUserCart}/>
            );
          })}
      </Row>
      </CartProvider>
    </>
  );
};

export default Home;
