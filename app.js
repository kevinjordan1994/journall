import renderNewJournalModal from "./view/renderNewJournalModal.js";
import { checkForValidUser, currentUser } from "./model/userValidation.js";
import renderJournals from "./view/renderJournals.js";

//Query Selectors===========================================================
//Sign in
const userNameInput = document.querySelector(".sign-in__user-name");
const passwordInput = document.querySelector(".sign-in__password");
const signInButton = document.querySelector(".sign-in__button");

signInButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  checkForValidUser(userNameInput.value, passwordInput.value);
});

const activateJournalButton = () => {
  const newJournalButton = document.querySelector(".journals__add-button");
  newJournalButton.addEventListener("click", renderNewJournalModal);
};

export const activateJournals = () => {
  renderJournals(currentUser);
  activateJournalButton();
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
