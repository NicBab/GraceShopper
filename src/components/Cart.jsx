import React from "react";
import "./css/Cart.css";
import { Table } from "react-bootstrap";
import CartItem from "./CartItem";

const Cart = ({ cart, setCart, product }) => {

  // const subtotal = () => {
  //   //map through each cart item and add each cartItem.price
  //   cart.map((cartItem, idx) => {
  //     let price = cart.pop()
  //     console.log(price)

  //     //forEach cart item, pop off the price, 
  //   })
  // }


  let total = 0;
  return (
    <>
      <div className="c">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item #</th>
              <th colSpan="3">Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem, idx) => {
              total += cartItem.price * cartItem.quantity;
              return <CartItem key={idx} cart={cart} cartItem={cartItem} />
            }
            )}
          </tbody>
        </Table>


        <div className="subtotal">
          <h5>Shipping:</h5>
          <br />
          <h4>Subtotal: ${total}</h4>
        </div>


      </div>
    </>
  );
};

export default Cart;
