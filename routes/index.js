const apiRouter = require('express').Router();
// const jwt = require('jsonwebtoken');
const { 
  createUser,
  getAllUsers,
  getAllProducts,
  getUserByUsername
 } = require("../db");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

//getUsers
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

//getProducts
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





//createUser
// apiRouter.post('/api/register', async (req, res, next) => {
//   const { username, email, password} = req.body;

//   try {
//     const _user = await getUserByUsername(username);

//     if (_user) {
//       next({
//         name: 'UserExistsError',
//         message: 'A user by that username already exists'
//       });
//     }

//     const user = await createUser({
//       username,
//       email,
//       password,
    
//     });

//     const token = jwt.sign({ 
//       id: user.id, 
//       username
//     }, process.env.JWT_SECRET, {
//       expiresIn: '1w'
//     });

//     res.send({ 
//       message: "thank you for signing up",
//       token 
//     });
//   } catch ({ name, message }) {
//     next({ name, message })
//   } 
// });




// apiRouter.post("/MyCart", async (req, res, next) => {
//   try {
    
//   } catch (error) {
//     next({name, messages})
//   }
// })


module.exports = {apiRouter}