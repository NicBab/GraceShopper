import React, { useState, useEffect } from 'react';
import './css/MyCart.css'
import {
    Paper,
    TableContainer,
    Table,
    TableHead, 
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';

import { getUserCart } from "../api";

const MyCart = ({cartItems}) => {

    const [userCart, setUserCart] = useState({});


    if (isEmpty) return <h1 className="emptyCart">Your Cart is Empty</h1>

 /*   useEffect(() => {
        getUserCart().then((response) => {
          setUserCart(response);
        });
      }, []);
*/

    return (
        <>

{cartItems.length === 0 && <h1 class="emptyCart">Your Cart is Empty</h1>}
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
{cartItems.length > 0 &&
          cartItems.map((product) => {
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

export default MyCart;