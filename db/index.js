const { Client } = require("pg");
const DB_NAME = "localhost:5432/ohshoesdb";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require("bcrypt");


async function createUser({ name, email, admin, password }) {
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
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1;
  `, [username]);
  
    return user;
  } catch(error) {
    throw error
  }
}

// build getUserByEmail

async function getAllUsers() {
  // select and return an array of all users
  try {
    const { rows: id } = await client.query(`
        SELECT id
        FROM users;
        `);
    const users = await Promise.all(id.map((user) => getUserById(user.id)))
    return users;
  } catch (error) {
    throw error;
  }
}

const createProduct = async ({
  img_url,
  name,
  description,
  SKU,
  price
}) => {
  console.log(img_url, name, description, SKU, price)
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      INSERT INTO products(img_url, name, description, SKU, price)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [img_url, name, description, SKU, price]
    );
    console.log(products, "**products**")
    return products;
  } catch (error) {
    console.error("Error creating product in db/index.js")
    throw error;
  }
}


async function createCategories({ name, description }) {
  try {
    const {
      rows: [categories],
    } = await client.query(
      `
      INSERT INTO category(name, description)
      VALUES($1, $2)
      RETURNING *;
      `,
      [name, description]
    );
    return categories;
  } catch (error) {
    throw error;
  }
}


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


module.exports = {
  client,
  createUser,
  getAllUsers,
  createCategories,
  createProduct,
  getAllProducts,
};
