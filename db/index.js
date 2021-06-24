const { Client } = require('pg');
const DB_Name = 'localhost:5432/   ...  ';
const DB_URL = process.env.DATABASE_URL || `postgress://${DB_NAME}`;
const client = new Client(DB_URL);


async function getAllUsers() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM users
        `);
      return rows
    } catch (error) {
      throw error 
    }
}

module.exports = { 
  getAllUsers,
  getAllProducts,
 }