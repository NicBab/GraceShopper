const express = require("express");
const ordersRouter = express.Router()
// const jwt = require('jsonwebtoken');
const {
  createOrders,
  getUserById
} = require("../db");

const { requireUser } = require("./utils")


ordersRouter.get("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = await getUserById(id);
      res.send(data.order);
    } catch (error) {
      console.error("Error with order route");
    }
  })
  
  ordersRouter.post("/", async (req, res, next) => {
    try {
      const data = await createOrders(req.user.id);
      res.send(data);
    } catch (error) {
      console.error("Error creating order in routes")
    }
  })

module.exports = ordersRouter;
