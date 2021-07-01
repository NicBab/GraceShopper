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

const MyCart = () => {
    const [cart, setCart] = useState([])

    useEffect(() => {
    }, [])

    return (
        <>
          <div className="cart">MyCart</div>
            <TableContainer component={Paper}>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell align="left">ID</TableCell>
                          <TableCell align="left">Name</TableCell>
                          <TableCell align="left">Description</TableCell>
                          <TableCell align="left">Price</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {/* {MyCart.map((product) => {
                          return (
                            <TableRow key={product.name}>
                                <TableCell component="th" scope="row">{product.id}</TableCell>
                                <TableCell align="left">{product.name}</TableCell>
                                <TableCell align="left">{product.goal}</TableCell>
                                <TableCell align="left">{product.creatorName}</TableCell>
                            </TableRow>
                          )
                      })} */}
                  </TableBody>
              </Table>
          </TableContainer> 
      </>
    )
}

export default MyCart