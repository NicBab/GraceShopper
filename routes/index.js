const apiRouter = require("express").Router();
// const jwt = require('jsonwebtoken');
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteCartItem,
  updateProductQty,
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  getUserCart,
  addToCart,
  createOrders,
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
    console.error(message)
  }
});

// Products
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

apiRouter.post("/products", async (req, res, next) => {
  const { img_url, name, description, price, inventory, category } = req.body;
  const productData = {};

  try {
    productData.img_url = img_url;
    productData.name = name;
    productData.description = description;
    productData.price = price;
    productData.inventory = inventory;
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

apiRouter.patch("/:product_id", async (req, res, next) => {
  const { product_id } = req.params;
  const { img_url, name, description, price, inventory, category } = req.body;

  const updateFields = {};

  if (img_url) {
    updateFields.img_url = img_url;
  }

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }

  if (price) {
    updateFields.price = price;
  }

  if (inventory) {
    updateFields.inventory = inventory;
  }

  if (category) {
    updateFields.category = category;
  }

  try {
    const updatedProduct = await updateProduct(product_id, updateFields);
    res.send({ updatedProduct });
  } catch ({ name, message }) {
    next({ name: "ProductUpdateError", message: "Unable to update product info!" });
    console.error(message)
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

// Cart

apiRouter.get("/cart", async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);
    console.log(user, "**********")
    res.send(user.cart);
  } catch (error) {
    next({ name: "ErrorGettingCart", messages: "Cannot Get the Cart" });
  }
});

apiRouter.post("/cart", async (req, res, next) => {
  try {
    const { id } = req.user;
    const { product_id, product_quantity } = req.body;
    const addedItem = await addToCart(id, product_id, product_quantity);
    res.send(addedItem)
  } catch (error) {
    console.error("Error adding item in routes")
  }
})

apiRouter.delete("/:product_id", async (req, res, next) => {
  try {
    const { id } = req.user;
    const { product_id } = req.params;
    const removedItem = await deleteCartItem(id, product_id);
    res.send(removedItem); 
  } catch (error) {
    console.error("Error deleting cart item in routes")
  }
})

apiRouter.patch(":/product_id", async (req, res, next) => {
  const { id } = req.user;
  const { product_id } = req.params;
  const { product_quantity } = req.body;
  const updatedItem = await updateProductQty(id, product_id, product_quantity);
  res.send(updatedItem)
})

apiRouter.post("/checkout", async (req, res, next) => {

})

// Order

apiRouter.get("/order", async (req, res, next) => {
  try {
    const { id } = req.user;
    const data = await getUserById(id);
    res.send(data.order);
  } catch (error) {
    console.error("Error with order route");
  }
})

apiRouter.post("/order", async (req, res, next) => {
  try {
    const data = await createOrders(req.user.id);
    res.send(data);
  } catch (error) {
    console.error("Error creating order in routes")
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

module.exports = { apiRouter };
