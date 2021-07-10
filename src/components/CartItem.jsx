import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import "./css/Cart.css";
import { TiDelete } from "react-icons/ti";


const CartItem = ({ cart, setCart, cartItem }) => {
    const [itemQty, setItemQty] = useState(1)

    const useEffect = () => {

    }

    
  return (
    <>
        <tr>
            <td>{cartItem.id}</td>
            <td colSpan="3">{cartItem.name} - {cartItem.category}</td>
            <td>
                <Form.Control
                defaultValue={cartItem.quantity}
                className="item-qty"
                min="1"
                type="number"
                />
            </td>
            <td>${cartItem.price * cartItem.quantity}</td>
            <td>
                <TiDelete />
            </td>
        </tr> 
    </>
  );
};

export default CartItem;

// {products.map((product, idx) => {
//     return <InventoryItem key={idx} setProducts={setProducts} product={product} products={products} />;
//   }).reverse()}
