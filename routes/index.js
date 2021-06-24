const apiRouter = require('express').Router();

const { 
  getAllUsers,
  getAllProducts,
 } = require("../db");

 
apiRouter.get("/users", async (req, res, next) => {
    try {
        const users = await getAllUsers

    } catch ({name, messages}) {
      next({name, messages})
    }
})


apiRouter.get("/products", async ( req, res, next) => {
  try {
    const products = await getAllProducts

  } catch ({name, messages}) {
    next({name, messages})
  }
})


module.exports = apiRouter;