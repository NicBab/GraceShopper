const { Client } = require("pg");
const DB_NAME = "localhost:5432/ohshoesdb";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require("bcrypt");

async function createUser({ name, email, admin, password = [] }) {
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

// build getUserByEmail

async function getAllUsers() {
  // select and return an array of all users
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM users;
        `);
    //const users = await Promise.all(id.map((user) => getUserById(user.id)))
    return rows;
  } catch (error) {
    throw error;
  }
}

// IMG add image insertions here
async function createProduct({
  img,
  name,
  description,
  SKU,
  price,
  categoryId,
}) => {

  try {
    const {
      rows: [products],
    } = await client.query(
      `
      INSERT INTO products(img, name, description, SKU, price, categoryID)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [img, name, description, SKU, price, categoryID]
    );
    return products;
  } catch (error) {
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
    const { rows } = await client.query(`
      SELECT *
      FROM products
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

//Rashon Test push

module.exports = {
  client,
  createUser,
  getAllUsers,
  createCategories,
  createProduct,
  getAllProducts,
};
