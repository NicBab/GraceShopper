const apiRouter = require('express').Router();

const { 
  getAllUsers,
  getAllProducts,
 } = require("../db");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.get("/users", async (_, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
          users: users,
        })

    } catch ({name, message}) {
      next({name: "GetUserError", message: "Unable to get users"})
    }
})


apiRouter.get("/products", async ( req, res, next) => {
  try {
    const products = await getAllProducts()
    res.send({
      products: products,
    })
  } catch ({name, messages}) {
    next({name: "GetProductsError", message: "Unable to get products"})
  }
})


module.exports = { apiRouter };