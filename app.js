import renderNewJournalModal from "./renderNewJournalModal.js";
import { checkForValidUser, currentUser } from "./userValidation.js";

//Query Selectors===========================================================
//Sign in
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

export const activateJournals = () => {
  //Add Journal button logic
  const newJournalButton = document.querySelector(".journals__add-button");
  newJournalButton.addEventListener("click", renderNewJournalModal);

  //Listener for clicking on titles
  const journalElements = document.querySelectorAll(".journals__title-div");
  journalElements.forEach((journal) =>
    journal.addEventListener("click", () => {
      const journalID = journal.dataset.id;
      const targetJournal = currentUser.journals.find(
        (journal) => journal.title === journalID
      );
    })
  );
};

main();
