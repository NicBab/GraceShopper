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

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT * 
    FROM users
    WHERE id=${userId}
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

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1;
  `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// build getUserByEmail - Rashon//Trying to push

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

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(`
    SELECT * 
    FROM products
    WHERE id=${productId}
    `);
    return product;
  } catch (error) {
    console.error(error)
  }
}

const createProduct = async ({
  img_url,
  name,
  description,
  price,
  quantity,
  category,
  active
}) => {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      INSERT INTO products(img_url, name, description, price, quantity, category, active)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [img_url, name, description, price, quantity, category, active]
    );
    return products;
  } catch (error) {
    console.error("Error creating product in db/index.js");
    throw error;
  }
};


async function updateProduct(productId, fields = {}) {
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
        WHERE id=${productId}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }

    // return early if there's no products to update
    // if (products === undefined) {
    //   return await getProductById(productId);
    // }

    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}

async function addToCart(user_id, product_id) {
  try {

    
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
  addToCart,
  getUserByUsername,
  getUserByEmail,
  getProductById
};