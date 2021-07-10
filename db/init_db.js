const {
  client,
  createUser,
  getAllUsers,
  createGuest,
  createProduct,
  getAllProducts,
  addItemToCart,
} = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    client.query(`
        DROP TABLE IF EXISTS order_items;
        DROP TABLE IF EXISTS cart_items;
        DROP TABLE IF EXISTS user_orders CASCADE;
        DROP TABLE IF EXISTS user_cart CASCADE;
        DROP TABLE IF EXISTS products CASCADE;
        DROP TABLE IF EXISTS user_address;
        DROP TABLE IF EXISTS guests;
        DROP TABLE IF EXISTS users CASCADE;
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

    CREATE TABLE guests(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      UNIQUE(email)
    );

    CREATE TABLE user_address(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      street VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      zipcode INT NOT NULL,
      UNIQUE(user_id)
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      img_url TEXT NOT NULL,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL DEFAULT 0,
      inventory INT NOT NULL, 
      category VARCHAR(255) NOT NULL,
      active boolean DEFAULT true,
      UNIQUE(name)
    );
    
    CREATE TABLE user_cart(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      active BOOLEAN DEFAULT TRUE
    );

    CREATE TABLE user_orders(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      user_cart_id INT REFERENCES user_cart(id) ON DELETE CASCADE,
      UNIQUE(user_id, user_cart_id)
    );

    CREATE TABLE cart_items(
      id SERIAL PRIMARY KEY,
      user_cart_id INT REFERENCES user_cart(id) ON DELETE CASCADE,
      product_id INT REFERENCES products(id) ON DELETE CASCADE,
      quantity INT NOT NULL,
      active BOOLEAN DEFAULT TRUE,
      UNIQUE(user_cart_id, product_id)
    );

    CREATE TABLE order_items(
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES user_orders(id) ON DELETE CASCADE,
      product_id INT REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL
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
          "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        name: "Nike Zoom",
        description: "Light Grey/Green",
        price: 80.00,
        inventory: 20,
        category: "shoes",
      },
      {
        img_url:
          "https://images.pexels.com/photos/4495416/pexels-photo-4495416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        name: "Nike Air Max 720",
        description: "'Sunrise'",
        price: 97.00,
        inventory: 20,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1539045230092-f8c7e0d1b4b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
        name: "Casio F-91WC",
        description: "Yellow digital watch",
        price: 39.99,
        inventory: 320,
        category: "accessories",
      },
      {
        img_url:
          "https://images.pexels.com/photos/4252965/pexels-photo-4252965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        name: "Nike Air Force 1 Custom",
        description: "White with custom mint drip",
        price: 140.0,
        inventory: 200,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1618420281222-091f6d69ffbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80",
        name: "Stussy Slides",
        description: "Lime Green",
        price: 85.99,
        inventory: 320,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1542629458-eaa56d608062?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80",
        name: "Clear Frame Sunnies",
        description: "Clear acrylic frame.",
        price: 24.99,
        inventory: 300,
        category: "accessories",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        name: "Nike Air Max 2.0",
        description: "Blue/Pink",
        price: 95.99,
        inventory: 320,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1597265245060-dad51a9463c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
        name: "Yeezy Boost 350 V2",
        description: "'Semi Frozen Yellow''",
        price: 401.00,
        inventory: 120,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1530227826287-f12d70f4ee18?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        name: "Lakers Beanie",
        description: "LA ONLY Purple",
        price: 40.00,
        inventory: 120,
        category: "hats",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1618329544399-da869978ef5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1352&q=80",
        name: "Nike Air Max 1/97 Sean Wotherspoon",
        description: "Multi color. Extra lace set only.",
        price: 210.99,
        inventory: 80,
        category: "shoes",
      },

      {
        img_url:
          "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?cs=srgb&dl=pexels-aman-jakhar-1124465.jpg&fm=jpg",
        name: "Nike Red Snapback",
        description: "Adjustable",
        price: 29.99,
        inventory: 90,
        category: "hats",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1598313697935-b4d757c226c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
        name: "Grateful Dead x Dunk Low SB",
        description: "'Yellow Bear'",
        price: 815.0,
        inventory: 50,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1589642380614-4a8c2147b857?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2467&q=80",
        name: "Cartier - Santos De Cartier",
        description: "Sunglasses Men Metal",
        price: 1145.0,
        inventory: 50,
        category: "accessories",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1618623583196-e4e9e11f8511?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1348&q=80",
        name: "Nike Air Force 1 WMNS",
        description: "Shadow 'Pastel'",
        price: 259.99,
        inventory: 45,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1606196480626-449de89dc7b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        name: "Reflective Shield Glasses",
        description: "Yellow mirrored lense futurism",
        price: 175.99,
        inventory: 110,
        category: "accessories",
      },
      {
        img_url:
          "https://images.pexels.com/photos/4252948/pexels-photo-4252948.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        name: "Nike Air Force 1",
        description: "Jewel Tones/Multi",
        price: 95.89,
        inventory: 55,
        category: "shoes",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1445282804813-123ac28fe498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
        name: "Brixton Snapback",
        description: "Rift Mp Hat in orange and black",
        price: 25.99,
        inventory: 10,
        category: "hats",
      },
      {
        img_url:
          "https://images.unsplash.com/photo-1596568359553-a56de6970068?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1328&q=80",
        name: "Air Jordan 1",
        description: "Retro High OG GS 'Pine Green 2.0'",
        price: 325.0,
        inventory: 50,
        category: "shoes",
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

const createInitialGuests = async () => {
  console.log("Starting to create guests!");

  try{ 
    const guestsToCreate = [
      {
        email: "shoeman123@gmail.com",
        name: "Daryl Harold"
      },
      {
        email: "actor_man10@yahoo.com",
        name: "Keanu Peeves"
      },
      {
        email: "johndoe@aol.com",
        name: "John Doe"
      },
    ];
    const guests = await Promise.all(guestsToCreate.map(createGuest));
    console.log("Guests created:");
    console.log(guests);
    console.log("Finished creating guests!");
  } catch (error) {
    console.error("Error creating guestS!");
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
    await createInitialGuests();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Testing DB...")

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);

    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);


    console.log("Calling addToCart");
    const userWithProduct = await addItemToCart(2, 3, 1);
    console.log("Result:", userWithProduct);

    console.log("Calling addToCart Again");
    const userWithSecondProduct = await addItemToCart(2, 1, 2);
    console.log("Result:", userWithSecondProduct);

    console.log("Calling addToCart For Different User");
    const secondUserWithProducts = await addItemToCart(3, 5, 2);
    console.log("Result:", secondUserWithProducts);

    // console.log("Calling createOrders");
    // const userOrder = await createOrders(2);
    // console.log("Results:", userOrder);

    // console.log("Calling createUserAddress");
    // const userAddress = await createUserAddress({
    //   user_id: 1,
    //   street: "167 Milky Way Drive",
    //   street_2: null,
    //   state: "NY",
    //   zip_code: "21188",
    // });
    // console.log("Results:", userAddress);


    console.log("Finished database tests!");


  } catch (error) {
    console.log("Error during testDB")
    throw error
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
