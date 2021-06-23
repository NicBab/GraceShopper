const { Client } = require('pg');
const DB_Name = 'localhost:5432/   ...  ';
const DB_URL = process.env.DATABASE_URL || `postgress://${DB_NAME}`;
const client = new Client(DB_URL);