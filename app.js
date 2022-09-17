import { checkForValidUser, currentUser } from "./userValidation.js";

//Query Selectors
const userNameInput = document.querySelector(".sign-in__user-name");
const passwordInput = document.querySelector(".sign-in__password");
const signInButton = document.querySelector(".sign-in__button");

function main() {
  //Event Listeners
  signInButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    checkForValidUser(userNameInput.value, passwordInput.value);
  });
}

main();
