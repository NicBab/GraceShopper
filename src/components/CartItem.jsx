import React from "react";
import { Form } from "react-bootstrap";
import "./css/Cart.css";
import { TiDelete } from "react-icons/ti";
import { removeFromCart } from "../api";

const CartItem = ({ cart, setCart, cartItem }) => {
    // const [itemQty, setItemQty] = useState(1)
    const { /*id, name, img_url, description, quantity, price,*/ product_id } =
    cartItem;
    const handleDeleteCartItem = async (event) => {
        try {
            alert("Item removed from cart.")
            await removeFromCart(product_id);
            const updatedCart = [...cart];
            updatedCart.splice(1);
            setCart(updatedCart);
        } catch (error) {
          console.error(error);
        }
      };

    
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
                <TiDelete className="delete-btn" onClick={handleDeleteCartItem}/>
            </td>
        </tr> 
    </>
  );
};

export default CartItem;

// {products.map((product, idx) => {
//     return <InventoryItem key={idx} setProducts={setProducts} product={product} products={products} />;
//   }).reverse()}
