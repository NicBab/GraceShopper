const {
  client,
  createUser,
  getAllUsers,
  createCategories,
  createProduct,
  getAllProducts,
  addToCart,
  getUserByUsername,
  getUserByEmail,
} = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    client.query(`
        DROP TABLE IF EXISTS cart_item;
        DROP TABLE IF EXISTS user_cart;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users_payment;
        DROP TABLE IF EXISTS users_address;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS category;
      `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      admin BOOLEAN DEFAULT FALSE
      );
	  
	   CREATE TABLE category(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL
 );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        img_url TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL NOT NULL,
        categoryId INT REFERENCES category(id) NOT NULL
      );

  CREATE TABLE user_cart(
   id SERIAL PRIMARY KEY,
   user_Id INT REFERENCES users(id) UNIQUE NOT NULL,
   active BOOLEAN DEFAULT TRUE
--    UNIQUE(user_id)
 );

 CREATE TABLE cart_item(
   id SERIAL PRIMARY KEY,
   session_id INT REFERENCES user_cart(id) NOT NULL,
   product_id INT REFERENCES products(id) NOT NULL,
   qty INT NOT NULL,
   UNIQUE(product_id)
 );

      `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {
        name: "Ryan",
        email: "sneakerhead123@gmail.com",
        password: "shoeguy123",
        admin: false,
      },
      {
        name: "Michelle",
        email: "michelle@admin.com",
        password: "admin123",
        admin: true,
      },
      {
        name: "Rashon",
        email: "rashon@admin.com",
        password: "admin456",
        admin: true,
      },
      {
        name: "Nick",
        email: "nick@admin.com",
        password: "admin789",
        admin: true,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  console.log("Starting to create Products!");
  try {
    const productsToCreate = [
      {
        img_url:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        name: "Shoe",
        description: "Very comfortable",
        price: 30.99,
        categoryId: 1,
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        name: "Asics",
        description: "ASICS X Mita GEL-Kayano Trainer",
        price: 100.99,
        categoryId: 1,
      },

      {
        img_url:
          "https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fG5pa2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Jordan",
        description: "Nike Jordan",
        price: 110.99,
        categoryId: 1,
      },

      {
        img_url:
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fG5pa2UlMjBzaG9lc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Vans",
        description: "Maroon and White Vans",
        price: 59.99,
        categoryId: 1,
      },

      {
        img_url:
          "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTF8fGJhc2ViYWxsJTIwaGF0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "VA RVCA",
        description: "Grey and White Hat",
        price: 29.99,
        categoryId: 2,
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1533603531139-2c4d04df8f16?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGJhc2ViYWxsJTIwaGF0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "NY Baseball Hat",
        description: "Navy and Red",
        price: 19.99,
        categoryId: 2,
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTk3fHxiYXNlYmFsbCUyMGhhdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Snapback",
        description: "White",
        price: 19.99,
        categoryId: 2,
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI2fHxiYXNlYmFsbCUyMGhhdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Beanie",
        description: "Black",
        price: 15.99,
        categoryId: 2,
      },
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

async function createInitialCategories() {
  try {
    const categoriesToCreate = [
      {
        name: "Shoes",
        description: "Shoes",
      },
      {
        name: "Hats",
        description: "Hats",
      },
    ];
    const categories = await Promise.all(
      categoriesToCreate.map(createCategories)
    );
    console.log("Categories created:");
    console.log(categories);
    console.log("Finished creating categories!");
  } catch (error) {
    console.error("Error creating categories!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialCategories();
    await createInitialProducts();
  } catch (error) {
    console.log("Error during rebuildDB");
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
