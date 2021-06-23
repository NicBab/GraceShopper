import axios from 'axios';

export async function getUsers() {
  try {
    const { data } = await axios.get(`/api/users`)

    return data;
  } catch (error) {
    throw error
  }
}