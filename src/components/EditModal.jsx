import React, { useState } from "react";
import Button from "react-bootstrap/button";
import Modal from "react-bootstrap/modal"
const EditModal = ({ 
  //products
  //products, 
  product, 
  //setProducts 
}) => {
  // const [name, setName] = useState(product.name);
  // const [description, setDescription] = useState(product.description);
  // const [price, setPrice] = useState(product.price);
  // const [quantity, setQuantity] = useState(product.quantity);
  // const [category, setCategory] = useState(product.category);
  // const [imgUrl, setImgUrl] = useState(product.img_url);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  
  // const handleShow = () => {
  //   setShow(true)
  // }

  // const handlePatchProduct = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await patchLink(id, img_url, name, description, price, quantity, category);
  //     let updateProducts = await getAllProducts();
  //     setProducts(updatedProducts.products);
  //     handleClose()
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
