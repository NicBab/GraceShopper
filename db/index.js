const { Client } = require("pg");
const DB_NAME = "localhost:5432/ohshoesdb";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require("bcrypt");

// *************** USER ***************

async function createUser({ name, email, password, admin }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [users],
    } = await client.query(
      `
      INSERT INTO users(name, email, password, admin)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
      `,
      [name, email, hashedPassword, admin]
    );
    password = hashedPassword;
    delete users.password;
    return users;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  // select and return an array of all users
  try {
    const { rows: id } = await client.query(`
    SELECT id
    FROM users;
    `);
    const users = await Promise.all(id.map((user) => getUserById(user.id)));
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(user_id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * 
    FROM users
    WHERE id=$1;
    `,
      [user_id]
    );

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "Could not find user by that id",
      };
    }

    delete user.password;

    const { rows: products } = await client.query(
      `
      SELECT *
      FROM products
      JOIN cart_items ON products.id=cart_items.product_id
      JOIN user_cart ON cart_items.user_cart_id=user_cart.id
      WHERE user_cart.user_id=$1
    `,
      [user_id]
    );
    user.cart = products;
    const { rows: orderProducts } = await client.query(
      `
      SELECT *
      FROM products
      INNER JOIN order_items ON products.id=order_items.product_id
      INNER JOIN user_orders ON order_items.order_id=user_orders.id
      WHERE user_orders.user_id=$1
    `,
      [user_id]
    );
    if (orderProducts) {
      user.order = orderProducts;
    } else {
      user.order = [];
    }

    const { rows: address } = await client.query(
      `
      SELECT user_address.*
      FROM user_address
      INNER JOIN users ON users.id = user_address.id
      WHERE user_address.user_id = $1
    `,
      [user_id]
    );

    if (address) {
      user.address = address;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE email=$1;
  `,
      [email]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUserAddress({ user_id, street, city, state, zipcode }) {
  try {
    await client.query(
      `
      INSERT INTO user_address(
        user_id, street, city, state, zipcode)
      VALUES($1, $2, $3, $4, $5)
      ON CONFLICT (user_id) DO NOTHING
      RETURNING *;
      `,
      [user_id, street, city, state, zipcode]
    );
    return await joinAddressToUser(user_id);
  } catch (error) {
    console.error("Error creating address");
  }
}

async function joinAddressToUser(user_id) {
  try {
    const { rows: userAddress } = await client.query(
      `
        SELECT users.id
        FROM users
        INNER JOIN user_address ON user_id = users.id
        WHERE user_address.user_id = $1
      `,
      [user_id]
    );
    return userAddress;
  } catch (error) {
    console.error("Error joining address");
  }
}

async function createGuest({ email, name }) {
  try {
    const {
      rows: [guests],
    } = await client.query(
      ` 
        INSERT INTO guests(email, name)
        VALUES($1, $2)
        ON CONFLICT (email) DO NOTHING
        RETURNING *;
      `,
      [email, name]
    );
    return guests;
  } catch (error) {
    throw error;
  }
}


// *************** PRODUCT ***************

const createProduct = async ({
  img_url,
  name,
  description,
  price,
  inventory,
  category,
}) => {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      INSERT INTO products(img_url, name, description, price, inventory, category)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [img_url, name, description, price, inventory, category]
    );
    return products;
  } catch (error) {
    console.error("Error creating product in db/index.js");
    throw error;
  }
};

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
      SELECT *
      FROM products;
    `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(product_id) {
  try {
    const {
      rows: [product],
    } = await client.query(`
    SELECT * 
    FROM products
    WHERE id=${product_id}
    `);
    return product;
  } catch (error) {
    console.error(error);
  }
}

async function updateProduct(product_id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    // update any fields that need to be updated
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE products
        SET ${setString}
        WHERE id=${product_id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }

    return await getProductById(product_id);
  } catch (error) {
    throw error;
  }
}

async function getCartByUserId(user_id) {
  try {
    const { rows: userCart } = await client.query(
      `
      SELECT *
      FROM user_cart
      WHERE user_id=$1
      AND active=true;
      `,
      [user_id]
    );
    return userCart;
  } catch (error) {
    console.error("Couldn't find cart");
  }
}

async function getAllCartItems() {
  try {
    const { rows } = await client.query(
      `
      SELECT *
        FROM products
        JOIN cart_items
        ON products.id=cart_items.product_id
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createCart(user_id) {
  try {
    const {
      rows: [userCart],
    } = await client.query(
      `
      INSERT INTO user_cart(user_id)
      VALUES ($1)
      RETURNING *;
      `,
      [user_id]
    );
    return userCart;
  } catch (error) {
    console.error("Error adding to usercart in db");
    throw error;
  }
}

async function addItemToCart(user_id, product_id, quantity) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * 
      FROM products
      WHERE id=$1;
      `,
      [product_id]
    );

    await createCartItem(user_id, product_id, quantity);
    return await getUserById(3);
  } catch (error) {
    console.error("Error adding items to cart in db");
    throw error;
  }
}

async function createCartItem(user_id, product_id, quantity) {
  try {
    // let userCart = await getCartByUserId(user_id);
    // if (userCart.length === 0) {
    //   userCart = await createCart(user_id);
    const userCart = await createCart(3);
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO cart_items(user_cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_cart_id, product_id) DO NOTHING
        RETURNING *;
        `,
      [userCart.id, product_id, quantity]
    );
    return product;
  } catch (error) {
    console.error("Problem creating cart item in db");
  }
}

async function createOrders({ cart_id, order_id }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO customer_orders(cart_id, order_id)
      VALUES($1, $2)
      RETURNING *;
      `,
      [cart_id, order_id]
    );
    return order;
  } catch (error) {
    console.error("Error adding to order in db");
    throw error;
  }
}

async function updateItemQty(user_cart_id, product_id, quantity) {
  try {
    await client.query(
      `
      UPDATE cart_products
      SET $3
      WHERE id=$1 AND product_id=$2
      RETURNING *;
      `,
      [user_cart_id, product_id, quantity]
    );
  } catch (error) {
    console.error("Error updating quantity");
  }
}

// setCartInactive
// deleteCartItem
// addCartProductsToOrderProducts
// bulkUpdateOrderProducts
// removeCartItemsOnOrder
// getUserByIdForOrders

module.exports = {
  client,
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getCartByUserId,
  getAllCartItems,
  createGuest,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateItemQty,
  createUserAddress,
  joinAddressToUser,
  createCart,
  addItemToCart,
  createOrders,
};
