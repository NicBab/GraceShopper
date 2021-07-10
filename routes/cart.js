const express = require("express");
const cartRouter = express.Router()
// const jwt = require('jsonwebtoken');
const {
  deleteCartItem,
  updateProductQty,
  getAllCartItems,
  getCartByUserId,
  addItemToCart,
  createCart,
} = require("../db");

const { requireUser } = require("./utils")

cartRouter.get("/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const userCart = await getCartByUserId(user_id);
    res.send(userCart);

  } catch (error) { 
    next({ name: "ErrorGettingCart", messages: "Cannot Get the Cart" });
  }
});

cartRouter.get("/", async (req, res, next) => {
    try {

      const cartItems = await getAllCartItems()
      res.send(cartItems);
    } catch (error) { 
      next({ name: "ErrorGettingCart", messages: "Cannot Get the Cart Items" });
    }
  });
  
  cartRouter.post("/", async (req, res, next) => {
    try {
      const { user_id, product_id, quantity } = req.params;
      const addedItem = await addItemToCart(user_id, product_id, quantity);
      res.send(addedItem)
    } catch (error) {
      console.error("Error adding item in routes")
    }
  })
  
cartRouter.delete("/:product_id", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { product_id } = req.params;
      const removedItem = await deleteCartItem(id, product_id);
      res.send(removedItem); 
    } catch (error) {
      console.error("Error deleting cart item in routes")
    }
  })
  
  cartRouter.patch(":/product_id", async (req, res, next) => {
    const { id } = req.user;
    const { product_id } = req.params;
    const { quantity } = req.body;
    const updatedItem = await updateProductQty(id, product_id, quantity);
    res.send(updatedItem)
  })
  
  // cartRouter.post("/checkout", async (req, res, next) => {
  
  // })

module.exports = cartRouter;
 