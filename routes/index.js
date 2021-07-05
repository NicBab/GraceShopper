const apiRouter = require("express").Router();
// const jwt = require('jsonwebtoken');
const {
  createUser,
  getAllUsers,
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  getUserCart,
  addToCart,
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

apiRouter.post("/products", async (req, res, next) => {
  const {
    img_url,
    name,
    description,
    price,
    quantity,
    category,
    active,
  } = req.body;
  const productData = {};

  try {
    productData.img_url = img_url;
    productData.name = name;
    productData.description = description;
    productData.price = price;
    productData.quantity = quantity;
    productData.category = category;
    productData.active = active;

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

apiRouter.delete("/:productId", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId);
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

apiRouter.get("/MyCart", async (req, res, next) => {
  try {
    const cart = await getUserCart();
    console.log(cart);
    res.send({
      cart: cart,
    });
  } catch (error) {
    next({ name: "ErrorGettingCart", messages: "Cannot Get the Cart" });
  }
});

apiRouter.post("/MyCart/addItems", async (req, res, next) => {
  const {
    cartid,
    product_id,
    product_name,
    product_quantity,
    product_price,
  } = req.body;

  const newItems = {};
  try {
    const userID = await getUserById();
    const user = userID.id;

    const newCart = await createCart(user);
    const cartID = newCart.id;

    newItems.cartid = cartID;
    newItems.product_id;
    newItems.product_name;
    newItems.product_quantity = 1;
    newItems.product_price;

    const addedItem = await addToCart(newItems);
    console.log(addedItem);
    return addedItem;
  } catch (error) {
    next({
      name: "ErrorAddingProduct",
      messages: "Could not add item to the Cart",
    });
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
