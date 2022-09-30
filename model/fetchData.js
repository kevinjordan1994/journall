import { API_KEY } from "../config.js";

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

export async function replaceData(path = "journals.json", data = undefined) {
  const databaseURL = `${API_KEY}${path}`;
  try {
    const response = await (!data
      ? fetch(databaseURL)
      : fetch(databaseURL, {
          method: `PUT`,
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
  const usersArray = [];
  const users = await fetchData(`users.json`);
  for (const user in users) {
    usersArray.push(users[user]);
  }
  const targetUser = usersArray.find((user) => user.userName === userName);
  if (!targetUser) return null;
  return targetUser;
}
