const apiRouter = require("express").Router();
// const jwt = require('jsonwebtoken');
const {
  createUser,
  getAllUsers,
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct
} = require("../db");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

//getUsers
apiRouter.get("/users", async (_, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users: users,
    });
  } catch ({ name, message }) {
    next({ name: "GetUserError", message: "Unable to get users" });
  }
});

//getProducts
apiRouter.get("/products", async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.send({
      products: products,
    });
  } catch ({ name, messages }) {
    next({ name: "GetProductsError", message: "Unable to get products" });
  }
});

// apiRouter.post("/users", async (req, res, next) => {
//   const { name, email, password } = req.body
//   try {
//     const userData = {
//       name: name,
//       email: email,
//       password: password
//     }
//     const newUser = await createUser(userData)

//     if (newUser) {
//       res.send({ userData })
//     } else {
//       next({
//         name: "Create User Error",
//         message: "Error Creating User"
//       })
//     }

//   } catch ({name, messages}) {
//     next({name, messages})
//   }
// })

apiRouter.post("/products", async (req, res, next) => {
  const { img_url, name, description, price, quantity, category } = req.body;
  const productData = {};

  try {
    productData.img_url = img_url;
    productData.name = name;
    productData.description = description;
    productData.price = price;
    productData.quantity = quantity;
    productData.category = category;

    if (!name) {
      res.send(next(console.error({ message: "Must include name" })));
    }

    if (!description) {
      res.send(next(console.error({ message: "Must include description" })));
    }

    if (!price) {
      res.send(next(console.error({ message: "Must include price" })));
    }
    const newProduct = await createProduct(productData); // req.body
    res.send({
      message: "Product successfully created!",
      newProduct,
    });
  } catch ({ name, message }) {
    next({
      name: "ProductCreateError",
      message: "Unable to create new Product.",
    });
  }
});

apiRouter.delete("/:product_id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.product_id);
    if (product.active) {
      const updatedProduct = await updateProduct(product.id, { active: false });
      res.send({ product: updatedProduct });
    } else {
      res.send({
        name: "ProductInactiveError",
        message: "This product is already deleted!",
      });
    }
  } catch ({ name, message }) {
    next({ name: "ProductUpdateError", message: "Unable to update product!" });
  }
});

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

module.exports = { apiRouter };
