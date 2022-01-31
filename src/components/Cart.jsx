import React from "react";
import "./css/Cart.css";
import { Table, Button } from "react-bootstrap";
import CartItem from "./CartItem";

const Cart = ({ cart }) => {

  const handleCheckout = (event) => {
    alert("Thank you for your order!");

  } 

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
          <h5>Shipping: $20.00 (USPS Priority)</h5>
          <br />
          <h4>Subtotal: ${total + 20}</h4>
          {'  '}
          <Button onClick={handleCheckout} variant="outline-success">Checkout</Button>{' '}
        </div>


      </div>
    </>
  );
};

export default Cart;
