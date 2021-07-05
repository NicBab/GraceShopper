const { Client } = require("pg");
const DB_NAME = "localhost:5432/ohshoesdb";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require("bcrypt");

// USER FUNCTIONS

async function createUser({
  name,
  email,
  password,
  address,
  city,
  state,
  zipcode,
  admin,
}) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [users],
    } = await client.query(
      `
      INSERT INTO users(name, email, password, address, city, state, zipcode, admin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
      `,
      [name, email, hashedPassword, address, city, state, zipcode, admin]
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

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT * 
    FROM users
    WHERE id=$1;
    `);

    // if (!user) {
    //   throw {
    //     name: "UserNotFoundError",
    //     message: "Could not find a user with that id",
    //   };
    // }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(name) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE name=$1;
  `,
      [name]
    );

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

// PRODUCT FUNCTIONS

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
      SELECT *
      FROM products
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

const createProduct = async ({
  img_url,
  name,
  description,
  price,
  quantity,
  category

}) => {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      INSERT INTO products(img_url, name, description, price, quantity, category)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [img_url, name, description, price, quantity, category]
    );
    return products;
  } catch (error) {
    console.error("Error creating product in db/index.js");
    throw error;
  }
};


async function updateProduct(product_id, fields = {}) {
  const { img_url, name, descripiton, quantity, category } = fields;
  delete fields.img_url;
  delete fields.name;
  delete fields.descripiton;
  delete fields.quantity;
  delete fields.category;

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

    // return early if there's no products to update
    // if (products === undefined) {
    //   return await getProductById(product_id);
    // }

    return await getProductById(product_id);
  } catch (error) {
    throw error;
  }
}

async function createCart({ orderid, user_id }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO user_cart(orderid, user_id)
      VALUES($1, $2)
      RETURNING *;
      `,
      [orderid, user_id]
    );
    return cart;
  } catch (error) {
    console.error("Error adding to usercart in db");
    throw error;
  }
}

async function addToCart({
  cartid,
  product_id,
  product_name,
  product_quantity,
  product_price,
}) {
  try {
    const {
      rows: [items],
    } = await client.query(
      `
      INSERT INTO cart_items(cartid, product_id, product_name, product_quantity, product_price)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [cartid, product_id, product_name, product_quantity, product_price]
    );
    return items;
  } catch (error) {
    console.error("Error adding to items to cart in db");
    throw error;
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

async function getUserCart(userId) {
  const user = await getUserById();
  console.log(user, "this is your cart.");
  try {
    const { rows: cart } = await client.query(`
      SELECT *
      FROM user_cart
      WHERE user_id=${userId};
    `);
    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  createCart,
  addToCart,
  createOrders,
  getUserByUsername,
  getUserByEmail,
  getProductById,
  getUserCart,
  updateProduct
};
