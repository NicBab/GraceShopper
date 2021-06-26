const apiRouter = require('express').Router();


const { 
  createUser,
  getAllUsers,
  getAllProducts,
  createProduct
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


apiRouter.post("/users", async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const userData = {
      name: name,
      email: email,
      password: password
    }
    const newUser = await createUser(userData)

    if (newUser) {
      res.send({ userData })
    } else {
      next({
        name: "Create User Error",
        message: "Error Creating User"
      })
    }

  } catch ({name, messages}) {
    next({name, messages})
  }
})

apiRouter.post("/products", async (req, res, next) => {
  const { name, description, img_url, price, SKU } = req.body;
  const productData = {};

  try {
    productData.name = name;
    productData.description = description;
    productData.img_url = img_url;
    productData.price = price;
    productData.SKU = SKU;

    if (!name) {
      res.send(next(console.error({message: "Must include name"})))
    }

    if (!description) {
      res.send(next(console.error({message: "Must include description"})))
    }

    if (!price) {
      res.send(next(console.error({message: "Must include price"})))
    }

    const newProduct = await createProduct(productData);

    res.send({
      message: "Product successfully created!",
      newProduct,
    });
  } catch ({name, message}) {
    next({ name: "ProductCreateError", message: "Unable to create new Product." })
  }
})

module.exports = {apiRouter}