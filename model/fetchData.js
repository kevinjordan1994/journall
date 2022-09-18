import { API_KEY } from "../config.js";
import { currentUser } from "./userValidation.js";

export async function fetchData(path = "users.json", data = undefined) {
  const databaseURL = `${API_KEY}${path}`;
  try {
    const response = await (!data
      ? fetch(databaseURL)
      : fetch(databaseURL, {
          method: `POST`,
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }));

    if (!response.ok) throw new Error("Failed to fetch database.");

    const newData = await response.json();
    return newData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function findUser(userName) {
  const user = await fetchData(`users/${userName}.json`);
  if (!user) return null;
  return user;
}
