import { fetchData, findUser } from "./fetchData.js";
import { activateJournals, handleError } from "../app.js";
import { filterLocalJournals } from "./journals.js";

export let currentUser = null;

export const checkForValidUser = async (userName, password) => {
  try {
    const user = await findUser(userName);
    if (!user) throw new Error("User does not exist.");
    const validUser = user.password === password;
    if (!validUser) throw new Error("Password is incorrect.");
    await signUserIn(user);
  } catch (error) {
    handleError(error.message);
  }
};

const signUserIn = async (user) => {
  currentUser = user;
  const allJournals = await fetchData(`journals.json`);
  filterLocalJournals(allJournals);
  activateJournals();
};

export async function reloadUser(userName) {
  currentUser = await findUser(userName);
  console.log(currentUser);
}
