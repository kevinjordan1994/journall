import { dummyUsers } from "./data/dummyUsers.js";
import { recieveUsers } from "./data/fetchData.js";

//Query Selectors
const userNameInput = document.querySelector(".sign-in__user-name");
const passwordInput = document.querySelector(".sign-in__password");
const signInButton = document.querySelector(".sign-in__button");

recieveUsers();

function main() {
  const checkValidSignIn = (userName, password) => {
    const validUser = dummyUsers.find(
      (user) => user.userName === userName && user.password === password
    );
    if (!validUser) {
      console.log("Invalid user!");
      return;
    }
    console.log(validUser, "Welcome user!");
  };

  //Event Listeners
  signInButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    checkValidSignIn(userNameInput.value, passwordInput.value);
  });
}

main();
