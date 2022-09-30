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

export const addNewUser = async (userName, password) => {
  try {
    await checkIfUserAlreadyExists(userName);
    checkForValidPassword(password);
    const newUser = { userName, password };
    await fetchData("users.json", newUser);
    await signUserIn(newUser);
    console.log(currentUser);
  } catch (error) {
    handleError(error.message);
  }
};

const checkIfUserAlreadyExists = async (userName) => {
  const existingUser = await findUser(userName);
  if (existingUser) {
    throw new Error("User Name is taken!");
  }
};

const checkForValidPassword = (password) => {
  if (password.trim().length < 7) {
    throw new Error("Password must be at least 7 characters!");
  }
  if (!/\d/.test(password)) {
    throw new Error("Password must contain a number!");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain a capital letter!");
  }
};

const signUserIn = async (user) => {
  currentUser = user;
  const allJournals = await fetchData(`journals.json`);
  filterLocalJournals(allJournals);
  activateJournals();
};
