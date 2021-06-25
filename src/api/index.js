import axios from 'axios';


export async function createUser({ name, email, password = [] }) {
  try {
    const data = await axios.post(`/api/users`, {
      name: `${name}`,
      email: `${email}`, 
      password: `${password}`
    })

    return data
  } catch (error) {
    throw error
  }
}


export async function getAllUsers() {
  try {
    const { data } = await axios.get(`/api/users`)
    console.log(data)
    return data;
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


export async function getAllProducts() {
  try {
    const { data } = await axios.get(`/api/products`)
    return data;
  } catch (error) {
    throw error
  }
}