import React from 'react';
import {
    Form
} from 'react-bootstrap';
import './css/Cart.css'
import {TiDelete} from "react-icons/ti"
const CartItem = ({cart, setCart}) => {


    return (
        <>
            <td>12</td>
            <td colSpan="3"> Cool shoe image. Cool shoe</td>
            <td><Form.Control defaultValue="1" className="item-qty" min="1" type="number" /></td>
            <td>50.00</td>
            <td><TiDelete /></td>
        </>
    )
}

export default CartItem;