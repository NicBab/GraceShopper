const {
  client,
  createUser,
  //getAllUsers,
  createProduct,
  getAllProducts,
  createCart,
  addToCart,
  createOrders,
  getUserByUsername,
  getUserByEmail,
  getCart,

} = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    client.query(`
        DROP TABLE IF EXISTS customer_orders;
        DROP TABLE IF EXISTS cart_items;
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
      address VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      zipcode INT NOT NULL,
      admin BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      img_url TEXT NOT NULL,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT NOT NULL,
      price DECIMAL NOT NULL UNIQUE,
      quantity INT NOT NULL, 
      category VARCHAR(255) NOT NULL,
      active boolean DEFAULT true
    );

    CREATE TABLE user_cart(
      id SERIAL PRIMARY KEY,
      orderid SERIAL NOT NULL UNIQUE,
      user_id INT REFERENCES users(id) NOT NULL,

      active BOOLEAN DEFAULT TRUE,
      cartDT DATE NOT NULL DEFAULT CURRENT_DATE,
      UNIQUE(user_id, orderid)
    );

    CREATE TABLE cart_items(
      id SERIAL PRIMARY KEY,
      cartID INT REFERENCES user_cart(id) NOT NULL,
      product_id INT REFERENCES products(id) NOT NULL UNIQUE,
      product_name VARCHAR(255) REFERENCES products(name) NOT NULL UNIQUE,
      product_quantity INT NOT NULL,
      product_price DECIMAL REFERENCES products(price) NOT NULL,
      UNIQUE(product_id, product_name)
    );

    CREATE TABLE customer_orders(
      id SERIAL PRIMARY KEY,
      cart_id INT REFERENCES user_cart(id) NOT NULL,
      order_id INT REFERENCES user_cart(orderid) NOT NULL
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
        address: "1619 Washington AVE",
        city: "Brooklyn",
        state: "New York",
        zipcode: "11201",
        admin: false,
      },
      {
        name: "Michelle",
        email: "michelle@admin.com",
        password: "admin123",
        address: "1001 Bourbon Street",
        city: "New Orleans",
        state: "Lousiana",
        zipcode: "70014",
        admin: true,
      },
      {
        name: "Rashon",
        email: "rashon@admin.com",
        password: "admin456",
        address: "1619 Washington St.",
        city: "Napoleonville",
        state: "Louisiana",
        zipcode: "70390",
        admin: true,
      },
      {
        name: "Nick",
        email: "nick@admin.com",
        password: "admin789",
        address: "4545 Weschester St.",
        city: "St. Louis",
        state: "Missouri",
        zipcode: "63101",
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
        quantity: 100,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        name: "Asics",
        description: "ASICS X Mita GEL-Kayano Trainer",
        price: 100.99,
        quantity: 200,
        category: "shoes",
      },

      {
        img_url:
          "https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fG5pa2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Jordan",
        description: "Nike Jordan",
        price: 110.99,
        quantity: 80,
        category: "shoes",
      },

      {
        img_url:
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fG5pa2UlMjBzaG9lc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Vans",
        description: "Maroon and White Vans",
        price: 59.99,
        quantity: 320,
        category: "shoes",
      },

      {
        img_url:
          "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTF8fGJhc2ViYWxsJTIwaGF0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "VA RVCA",
        description: "Grey and White Hat",
        price: 29.99,
        quantity: 90,
        category: "hats",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1533603531139-2c4d04df8f16?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGJhc2ViYWxsJTIwaGF0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "NY Baseball Hat",
        description: "Navy and Red",
        price: 19.99,
        quantity: 60,
        category: "hats",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTk3fHxiYXNlYmFsbCUyMGhhdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Snapback",
        description: "White",
        price: 69.99,
        quantity: 110,
        category: "hats",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI2fHxiYXNlYmFsbCUyMGhhdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: "Beanie",
        description: "Black",
        price: 15.99,
        quantity: 145,
        category: "hats",
      },
      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/NS_sacai_Cornell_SHIELD_set_ORANGE_angle_720x.jpg?v=1571440067",
        name: "Native Sons",
        description: "'Cornell' Shield Set - Brown Tort",
        price: 750.0,
        quantity: 50,
        category: "accessories",
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

async function createInitialUserCart() {
  console.log("Starting to create User Cart!");
  try {
    const cartToCreate = [
      {
        orderid: "1",
        user_id: "3",
      },
    ];
    const cart = await Promise.all(cartToCreate.map(createCart));
    console.log("Cart created:");
    console.log(cart);
    console.log("Finished creating cart!");
  } catch (error) {
    console.error("Error creating cart!");
    throw error;
  }
}

async function createInitialCartItems() {
  console.log("Starting to add to Cart!");
  try {
    const productsToAdd = [
      {
        cartid: "1",
        product_id: "1",
        product_name: "Shoe",
        product_quantity: "1",
        product_price: "30.99",
      },
      {
        cartid: "1",
        product_id: "3",
        product_name: "Jordan",
        product_quantity: "1",
        product_price: "110.99",
      },
    ];
    const cartItems = await Promise.all(productsToAdd.map(addToCart));
    console.log("Products added to cart:");
    console.log(cartItems);
    console.log("Finished adding products to cart!");
  } catch (error) {
    console.error("Error adding products to cart!");
    throw error;
  }
}

async function createInitialOrders() {
  console.log("Starting to create Order!");
  try {
    const orderToCreate = [
      {
        cart_id: "1",
        order_id: "1",
      },
    ];
    const cart = await Promise.all(orderToCreate.map(createOrders));
    console.log("Order created:");
    console.log(cart);
    console.log("Finished creating order!");
  } catch (error) {
    console.error("Error creating order!");
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
    await createInitialUserCart();
    await createInitialOrders();
    await createInitialCartItems();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .then(console.log("testDB goes here"))
  .catch(console.error)
  .finally(() => client.end());
