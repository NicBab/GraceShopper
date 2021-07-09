import React from "react";
import "./css/Cart.css";
import { Table } from "react-bootstrap";
import CartItem from "./CartItem";

const Cart = ({ cart, setCart, product }) => {


  return (
    <>
      <div className="c">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order #</th>
              <th colSpan="3">Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <CartItem />
            </tr>
          </tbody>
        </Table>


        <div className="subtotal">
          <h5>Shipping:</h5>
          <br />
          <h4>Subtotal: $50.00</h4>
        </div>


      </div>
    </>
  );
};

export default Cart;
