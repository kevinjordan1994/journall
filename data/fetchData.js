import { API_KEY } from "../config.js";

export async function recieveUsers() {
  const fetchUsers = async () => {
    const response = await fetch(`${API_KEY}users.json`);

    if (!response.ok) {
      throw new Error("Failed to fetch users.");
    }

    const data = await response.json();
    return data;
  };
  try {
    const data = await fetchUsers();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}
