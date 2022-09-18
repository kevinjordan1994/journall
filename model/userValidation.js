import { findUser } from "./fetchData.js";
import { activateJournals } from "../app.js";

export let currentUser = null;

export const checkForValidUser = async (userName, password) => {
  try {
    const user = await findUser(userName);
    if (!user) throw new Error("User does not exist.");
    const validUser = user.password === password;
    if (!validUser) throw new Error("Password is incorrect.");
    signUserIn(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

const signUserIn = (user) => {
  currentUser = user;
  activateJournals();
};

export async function reloadUser(userName) {
  currentUser = await findUser(userName);
  console.log(currentUser);
}
