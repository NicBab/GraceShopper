import React, { useState, useEffect } from 'react';
import './css/Cart.css'
import {
    Paper,
    TableContainer,
    Table,
    TableHead, 
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import axios from 'axios';
import { getUserCart } from '../api';

const Cart = ({cart, setCart}) => {

  useEffect(() => {
    async function getCart() {
        const userCart = await getUserCart();
        setCart(userCart)
    }
    getCart()
  }, [])


    return (
        <>

{cart.length === 0 && <h1 className="emptyCart">Your Cart is Empty</h1>}
<div className="cart">
          </div>
            <TableContainer component={Paper}>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell align="left">ID</TableCell>
                          <TableCell align="left">Name</TableCell>
                          <TableCell align="left">Quantity</TableCell>
                          <TableCell align="left">Price</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
{cart.length > 0 &&
          cart.map((product) => {
              console.log(product)
            return (
                <TableRow key={product}>
                                <TableCell component="th" scope="row">{product.id}</TableCell>
                                <TableCell align="left">{product.name}</TableCell>
                                <TableCell align="left">{product.qunatity}</TableCell>
                                <TableCell align="left">{product.price}</TableCell>
                            </TableRow>
            );
          })}


                  </TableBody>
              </Table>
          </TableContainer> 
      </>
    )
}

export default Cart;