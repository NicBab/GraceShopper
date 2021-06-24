const { 
    client,
    createUser,
    getAllUsers,
    createProduct,
    getAllProducts,
} = require('./index')

async function dropTables() {
  try {
    console.log('Starting to drop tables...');
    client.query(`
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users_payment;
        DROP TABLE IF EXISTS users_address;
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
     CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      admin BOOLEAN NOT NULL
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        SKU VARCHAR(255) NOT NULL,
        price DECIMAL NOT NULL
      );
      `);
    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      {
        name: "Ryan",
        email: "sneakerhead123@gmail.com",
        password: "shoeguy123",
        admin: false

      },
      {
        name: "Michelle",
        email: "michelle@admin.com",
        password: "admin123",
        admin: true
      },
      {
        name: "Rashon",
        email: "rashon@admin.com",
        password: "admin456",
        admin: true
      },
      {
        name: "Nick",
        email: "nick@admin.com",
        password: "admin789",
        admin: true
      }
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:");
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  console.log('Starting to create Products!')
    try {
      const productsToCreate = [
        {
          name: "Shoe",
          description: "Very comfortable",
          SKU: 12345,
          price: 30.99
        }
      ];
      const products = await Promise.all(productsToCreate.map(createProduct));
      console.log("Products created:");
      console.log(products);
      console.log("Finished creating products!");
    } catch (error) {
      console.error("Error creating products!");
      throw error;
    }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
  }
}

// async function testDB() {
//   try {
//     console.log("Starting to test database...");

//     console.log("Calling getAllUsers");
//     const users = await getAllUsers();
//     console.log("Result:", users);
  
//   } catch (error) {
//     console.log("Error during testDB");
//     throw error;
//   }
// }



rebuildDB()
  .then(console.log("testDB goes here"))
  .catch(console.error)
  .finally(() => client.end());