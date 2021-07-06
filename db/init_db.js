const {
  client,
  createUser,
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
        DROP TABLE IF EXISTS cart_items CASCADE;
        DROP TABLE IF EXISTS user_cart CASCADE;
        DROP TABLE IF EXISTS products CASCADE;
        DROP TABLE IF EXISTS users_payment;
        DROP TABLE IF EXISTS users_address;
        DROP TABLE IF EXISTS users CASCADE;
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
          "https://cdn.shopify.com/s/files/1/0214/7974/products/sauconyShadowOriginalGreyOliveGreenSneakerPOliticsWHites-4_540x.jpg?v=1625162893",
        name: "Saucony Shadow Original",
        description: "Light Grey/Green",
        price: 80.0,
        quantity: 20,
        category: "shoes",
      },
      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/NiekAirForce1QSUndreBrushSneakerPOliticsWhites-4_720x.jpg?v=1623273969",
        name: "Nike Air Force 1 QS",
        description: "Natural/Underbrush/Acorn",
        price: 130.0,
        quantity: 200,
        category: "shoes",
      },

      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/ReferenceSnapBackHatsSneakerpOlitics-06_540x.jpg?v=1622833226",
        name: "Reference Paradise Snap Back",
        description: "Black",
        price: 45.99,
        quantity: 320,
        category: "hats",
      },
      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/NikeLeBronXVIIIPsychadelicPurpleSneakerPoliticsWhites-5_540x.jpg?v=1624544942",
        name: "Nike LeBron XVIII 'Best 10-18'",
        description: "Psychadelic Purple/Black/Multi",
        price: 210.99,
        quantity: 80,
        category: "shoes",
      },

      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/b55d30db9394c937d60c4e520738c06c_1024x1024_2x_66152e0a-7423-4248-b3bf-d38385cf0f3e_540x.jpg?v=1622587814",
        name: "Cold World Cold Bunny Hat",
        description: "Teal",
        price: 39.99,
        quantity: 90,
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
      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/CK2351-106-PHSLH000-2000_540x.jpg?v=1625347372",
        name: "WMNS Adidas Ultraboost 21",
        description: "Halo Blush/Wonder White/Ambient Blush",
        price: 179.99,
        quantity: 45,
        category: "shoes",
      },
      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/h34606_prappfront_001_fi_540x.jpg?v=1623786020",
        name: "Adidas x Noah Floral Tech Cap",
        description: "Multi",
        price: 59.99,
        quantity: 110,
        category: "hats",
      },
      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/Sneaker_Politics_doc_martins_1_540x.jpg?v=1625540493",
        name: "Basquiat x Dr. Martens 1460",
        description: "Black/Multi",
        price: 155.99,
        quantity: 55,
        category: "shoes",
      },
      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/ScreenShot2021-05-06at4.11.48PM_540x.jpg?v=1620753133",
        name: "Nike ACG Karst Bag",
        description: "Black/Peat Moss",
        price: 70.0,
        quantity: 50,
        category: "accessories",
      },
      {
        img_url:
          "https://cdn.shopify.com/s/files/1/0214/7974/products/AOTSocks1_540x.jpg?v=1620908333",
        name: "AOT Lo-Fi Socks",
        description: "Green",
        price: 15.0,
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

// async function createInitialUserCart() {
//   console.log("Starting to create User Cart!");
//   try {
//     const cartToCreate = [
//       {
//         orderid: "1",
//         user_id: "3",
//       },
//     ];
//     const cart = await Promise.all(cartToCreate.map(createCart));
//     console.log("Cart created:");
//     console.log(cart);
//     console.log("Finished creating cart!");
//   } catch (error) {
//     console.error("Error creating cart!");
//     throw error;
//   }
// }

// async function createInitialCartItems() {
//   console.log("Starting to add to Cart!");
//   try {
//     const productsToAdd = [
//       {
//         cartid: "1",
//         product_id: "1",
//         product_name: "Shoe",
//         product_quantity: "1",
//         product_price: "30.99",
//       },
//       {
//         cartid: "1",
//         product_id: "3",
//         product_name: "Jordan",
//         product_quantity: "1",
//         product_price: "110.99",
//       },
//     ];
//     const cartItems = await Promise.all(productsToAdd.map(addToCart));
//     console.log("Products added to cart:");
//     console.log(cartItems);
//     console.log("Finished adding products to cart!");
//   } catch (error) {
//     console.error("Error adding products to cart!");
//     throw error;
//   }
// }

// async function createInitialOrders() {
//   console.log("Starting to create Order!");
//   try {
//     const orderToCreate = [
//       {
//         cart_id: "1",
//         order_id: "1",
//       },
//     ];
//     const cart = await Promise.all(orderToCreate.map(createOrders));
//     console.log("Order created:");
//     console.log(cart);
//     console.log("Finished creating order!");
//   } catch (error) {
//     console.error("Error creating order!");
//     throw error;
//   }
// }

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    // await createInitialUserCart();
    // await createInitialOrders();
    // await createInitialCartItems();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .then(console.log("testDB goes here"))
  .catch(console.error)
  .finally(() => client.end());
