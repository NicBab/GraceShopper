const { Client } = require("pg");
const DB_NAME = "localhost:5432/ohshoesdb";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require("bcrypt");

// *************** USER ***************

async function createUser({
  name,
  email,
  password,
  admin
}) {
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

async function getAllUsers() {
  // select and return an array of all users
  try {
    const { rows: id } = await client.query(`
    SELECT id
    FROM users;
    `);
    const users = await Promise.all(id.map((user) => getUserById(user.id)));
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(user_id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT * 
    FROM users
    WHERE id=$1;
    `,
    [user_id]);

    // if (!user) {
    //   throw {
    //     name: "UserNotFoundError",
    //     message: "Could not find a user with that id",
    //   };
    // }

    //  products + address
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE email=$1;
  `,
      [email]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUserAddress({
  user_id,
  street,
  city,
  state,
  zipcode
}) {
  try {
    await client.query(
      `
      INSERT INTO user_address(
        user_id, street, city, state, zipcode)
      VALUES($1, $2, $3, $4, $5)
      ON CONFLICT (user_id) DO NOTHING
      RETURNING *;
      `,
      [user_id, street, city, state, zipcode]
    );
    return await joinAddressToUser(user_id)
  } catch (error) {
    console.error("Error creating address")
  }
}

async function joinAddressToUser(user_id) {
  try {
    const { rows: userAddress } = await client.query(
      `
        SELECT users.id
        FROM users
        INNER JOIN user_address ON user_id = users.id
        WHERE user_address.user_id = $1
      `,
      [user_id]
    );
    return userAddress;
  } catch (error) {
    console.error("Error joining address")
  }
}

async function createGuest({ email, name }) {
  try {
    const {
      rows: [guests],
    } = await client.query(
      ` 
        INSERT INTO guests(email, name)
        VALUES($1, $2)
        ON CONFLICT (email) DO NOTHING
        RETURNING *;
      `,
      [email, name]
    );
    return guests;
  } catch (error) {
    throw error;
  }
}

// ( PROBABLY NEED TO BUILD )
//
// deleteUser() 
//     
// verifyUniqueUser()
//
// createUserAddress()
//
// joinAddressToUser()
//// ---------------------------








// *************** PRODUCT ***************

const createProduct = async ({
  img_url,
  name,
  description,
  price,
  inventory,
  category

}) => {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      INSERT INTO products(img_url, name, description, price, inventory, category)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [img_url, name, description, price, inventory, category]
    );
    return products;
  } catch (error) {
    console.error("Error creating product in db/index.js");
    throw error;
  }
};

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
      SELECT *
      FROM products;
    `); 
    return products;
  } catch (error) {
    throw error;
  }
} 

async function getProductById(product_id) {
  try {
    const {
      rows: [product],
    } = await client.query(`
    SELECT * 
    FROM products
    WHERE id=${product_id}
    `);
    return product;
  } catch (error) {
    console.error(error);
  }
}

async function updateProduct(product_id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    // update any fields that need to be updated
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE products
        SET ${setString}
        WHERE id=${product_id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }


    return await getProductById(product_id);
  } catch (error) {
    throw error;
  }
}



// ( SHOULD WE BUILD THESE? )
//
// getProductByName 
//      -for search function?
//
// getProductByCategory 
//      -for rendering categories 
//       on the backend?
// --------------------------







// *************** CART FUNCTIONS ***************

async function createCart(user_id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO user_cart(user_id)
      VALUES($1)
      RETURNING *;
      `,
      [user_id]
    );
    return cart;
  } catch (error) {
    console.error("Error adding to usercart in db");
    throw error;
  }
}

async function addToCart({
  user_id,
  product_id,
  product_quantity,
}) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
      SELECT * 
      FROM products
      WHERE id=$1
      `,
      [product_id]
    );
    await createCartItem(user_id, item.id, product_quantity);
    return await getUserById(user_id);
  } catch (error) {
    console.error("Error adding to items to cart in db");
    throw error;
  }
}

createCartItem

async function createOrders({ cart_id, order_id }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO customer_orders(cart_id, order_id)
      VALUES($1, $2)
      RETURNING *;
      `,
      [cart_id, order_id]
    );
    return order;
  } catch (error) {
    console.error("Error adding to order in db");
    throw error;
  }
}

async function getUserCart(userId) {
  const user = await getUserById();
  console.log(user, "this is your cart.");
  try {
    const { rows: cart } = await client.query(`
      SELECT *
      FROM user_cart
      WHERE user_id=${userId};
    `);
    return cart;
  } catch (error) {
    throw error;
  }
}



// createCartItem
// updateCartItemQty
// createCart **
// getCartByUserId
// addToCart ** 
// setCartInactive
// deleteCartItem
// finish getUserById
// updateProductQty
// createUserOrder
// addCartProductsToOrderProducts
// bulkUpdateOrderProducts
// removeCartItemsOnOrder
// getUserByIdForOrders


module.exports = {
  client,
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  createGuest,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  createCart,
  addToCart,
  createOrders,
  getUserCart,
};
