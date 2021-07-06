import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { createProduct } from "../api";
import InventoryItem from "./InventoryItem";
import defaultImg from "../img/Default-Photo.png"
import AddModal from "./AddModal";
import Jumbotron from "react-bootstrap/Jumbotron"
import Container from "react-bootstrap/Container"
const Inventory = ({ product, products, setProducts }) => {
  const [show, setShow] = useState(false);
  const [addMode, setAddMode] = useState(false)
  

  const handleAdd = (id) => {
    setAddMode(true);
    setShow(true);
  };  

  return (
    <>
    <Jumbotron fluid>
  <Container>
    <h1>Add a Product.</h1>
    <p>
      Add and edit items in your store.
    </p>
      <Button variant="outline-primary" size="lg" block onClick={handleAdd} >
        Add an Item
        {addMode && (
          <AddModal 
            product={product}
            products={products}
            setProducts={setProducts}
            setAddMode={setAddMode}
            setShow={setShow}
            show={show}
            addMode={addMode}
          />
        )}
      </Button>
  </Container>
</Jumbotron>

      <h2>Inventory</h2>
      <hr></hr>
      <br/>
      <Row>
        {products.products &&
          products.products.map((product, idx) => {
            return <InventoryItem key={idx} setProducts={setProducts} product={product} products={products} />;
          })}
      </Row>
    </>
  );
};

export default Inventory;
