const express = require("express")
const apiRouter = express.Router()
const cartRouter = require("./cart");
const ordersRouter = require("./orders");
const productsRouter = require("./products");
const usersRouter = require("./users");
// const jwt = require('jsonwebtoken');
//const { getUserById } = require("../db");


// apiRouter.use(async (req, res, next) => {
//   try {
//     req.user = await getUserById();
//     next();
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });
 
// apiRouter.use((req, res, next) => {
//     if (req.user) {
//         console.log(req.user);
//         next();
//     } else {
//         console.log("User not found");
//         next();
//     }
// });

apiRouter.use("/cart", cartRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
 