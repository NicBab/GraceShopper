import axios from 'axios';


export async function getUsers() {
  try {
    const { data } = await axios.get(`/api/users`)
    return data;
  } catch (error) {
    throw error
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`/api/products`)

    return data
  } catch (error) {
    throw error
  }
}