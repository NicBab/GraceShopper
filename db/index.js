const { Client } = require('pg');
const DB_NAME = "localhost:5432/ohshoesdb";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require ("bcrypt");

async function createUser({
  name, 
  email,
  password = [] 
}) {
  try {
    // const SALT_COUNT = 10;
    // const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [users],
    } = await client.query(
      `
      INSERT INTO users(name, email, password)
      VALUES($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
      `,
      [name, email, password]
    );
    //password = hashedPassword;
    //delete user.password;
    return users;
  } catch (error) {
    throw error
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
      throw error 
    }
}


// async function createProduct() {
//   try {
    
//   } catch (error) {
//     throw error
//   }
// }


// async function getAllProducts() {
//   try {
//     const { rows } = await client.query(`
//       SELECT *
//       FROM products
//     `)  
//     return rows 
//   } catch (error) {
//     throw error
//   }
// }


module.exports = { 
  client,
  createUser,
  getAllUsers,
  // createProducts,
  // getAllProducts,
 };