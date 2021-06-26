import axios from 'axios';
import { storeCurrentUser } from '../auth'

///** */
// export async function createUser({ name, email, password = [] }) {
//   try {
//     const data = await axios.post(`/api/users/register`, {
//       name: `${name}`,
//       email: `${email}`, 
//       password: `${password}`
//     })

//     return data
//   } catch (error) {
//     throw error
//   }
// }

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
        password
      })
    })
    const data = await response.json()
    const token = await data.token
    storeCurrentUser(token)
  } catch (error) {
    throw error
  }
}

export async function loginUser() {
  try {
     
  } catch (error) {
    throw error
  }
}

// export async function getUserById(id) {
//   try {
//     const { data } = await axios.get(`/api/users/:id`)

//     return data
//   } catch (error) {
//     throw error
//   }
// }

export async function getAllUsers() {
  try {
    const { data } = await axios.get("/api/users")
    console.log(data)
    return data;
  } catch (error) {
    throw error
  }
}






export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products")
    return data;
  } catch (error) {
    throw error
  }
}


// export async function addToCart() {
//   try {
//     const { data } = await axios.post(`/api/cart`)

//   } catch (error)  {
//     throw error
//   }
// }