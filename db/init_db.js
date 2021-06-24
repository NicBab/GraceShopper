const { 
    createUsers,
    getAllUsers,
    createProducts,
    getAllProducts,
} = require('./index')

async function dropTables() {
  try {
    console.log('Starting to drop tables...');
    await client.query(`
        DROP TABLES IF EXISTS Users_payment;
        DROP TABLES IF EXISTS Users_Address;
        DROP TABLES IF EXISTS Products;
        DROP TABLE IF EXISTS users;
      `);
    console.log('Finished dropping tables!');
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...');
    await client.query(`
     CREATE TABLE Users (
        ID SERIAL PRIMARY KEY,
        Email TEXT NOT NULL UNIQUE,
        Password VARCHAR (255) NOT NULL,
        ConfirmPassword VARCHAR (255) NOT NULL,
        CreationDT DATE NOT NULL DEFAULT CURRENT_DATE,
      );
      CREATE TABLE Users_payment (
        ID SERIAL PRIMARY KEY,
        userID INT REFERENCES Users(id) NOT NULL,
        Payment_Type VARCHAR (255) NOT NULL,
        Payment_Provider VARCHAR (255) NOT NULL,
        CardNumber INT NOT NULL,
        CCV_Number INT NOT NULL,
        ExpirationDT date NOT NULL,
      );
      CREATE TABLE Users_Address (
        ID SERIAL PRIMARY KEY,
        userID INT REFERENCES Users(id) NOT NULL,
        address_line1 VARCHAR (255) NOT NULL,
        address_line2 VARCHAR (255) NULL,
        CITY VARCHAR (255) NOT NULL,
        STATE VARCHAR (255) NOT NULL,
        ZIP_CODE INT NOT NULL
      );
      CREATE TABLE Products(
        ID SERIAL PRIMARY KEY,
        name VARCHAR (255) NOT NULL,
        description VARCHAR (255) NOT NULL,
        category VARCHAR (255) NULL,
        inventory INT NOT NULL,
        price VARCHAR (255) NOT NULL,
        product_image BYTEA NOT NULL,
        product_color VARCHAR (255) NOT NULL,
       CreationDT DATE NOT NULL DEFAULT CURRENT_DATE,
      );
      `);
    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log('Starting to create users...');
    await createUser({
    });
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
    try {
        console.log('Starting to create Products!')
    } catch (error) {
      throw error
    }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}
rebuildDB();