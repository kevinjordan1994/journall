import { findUser } from "./data/fetchData.js";
import { activateJournals } from "./app.js";
import renderJournals from "./renderJournals.js";

export let currentUser = null;

//Check the database to see if the user exists, then check to see if the password is correct
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

//Set currentUser, render their journals and attach eventlisteners to them.
const signUserIn = (user) => {
  currentUser = user;
  renderJournals(user);
  activateJournals();
};
