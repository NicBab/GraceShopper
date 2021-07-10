import axios from "axios";
import { storeCurrentUser } from "../auth";

/*********** USER FUNCTIONS ***********/

export async function createUser(username, email, password) {
  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    const token = await data.token;
    storeCurrentUser(token);
  } catch (error) {
    throw error;
  }
}

export async function loginUser() {
  try {
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (error) {
    throw error;
  }
}

/*********** PRODUCT FUNCTIONS ***********/

export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createProduct({
  img_url,
  name,
  description,
  price,
  inventory,
  category,
}) {
  try {
    const { data } = await axios.post("/api/products", {
      img_url,
      name,
      description,
      price,
      inventory,
      category,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function patchProduct(
  id,
  img_url,
  name,
  description,
  price,
  inventory,
  category
) {
  try {
    const { data } = await axios.patch(`/api/products/${id}`, {
      img_url,
      name,
      description,
      price,
      inventory,
      category,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const { data } = await axios.delete(`/api/products/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCart() {
  try {
    const { data } = await axios.get("/api/cart");
    return data;
  } catch (error) {
    console.error("Error getting cart in api/index");
    throw error;
  }
}

export async function addToCart({user_id, product_id, quantity}) {

  try {
    const { data } = await axios.post("/api/cart", {
      user_id,
      product_id,
      quantity
    });
    return data;
  } catch (error) {
    console.error("Error adding to cart");
    throw error;
  }
}

export async function updateProductQty(product_id, quantity) {
  try {
    const { data } = await axios.patch(
      `/api/cart/${product_id}`,
      { quantity },
    );
    return data;
  } catch (error) {
    console.error("error updating quantity");
  }
}

export async function removeFromCart(product_id) {
  try {
    const { data } = await axios.delete(`api/cart/${product_id}, {}`);
    return data;
  } catch (error) {
    console.error("Error removing from cart");
    throw error;
  }
}

export async function checkout(cart) {
  try {
    const { data } = await axios.post("api/cart/checkout", cart);
    return data;
  } catch (error) {
    console.error("Error checking out");
    throw error;
  }
}

export async function createOrder() {
  try {
    const order = await axios.post(`/api/order`, {});
    return order;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const allOrders = await axios.get("api/order", {});
    return allOrders;
  } catch (error) {
    console.error("Error getting all orders");
    throw error;
  }
}

//getMyAccount
//removeUser
