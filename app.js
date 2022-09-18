import renderNewJournalModal from "./view/renderNewJournalModal.js";
import renderJournals from "./view/renderJournals.js";
import { clearModal } from "./view/renderModal.js";
import { checkForValidUser, currentUser } from "./model/userValidation.js";
import { modal } from "./model/modal.js";
import {
  createJournalsArray,
  addNewJournal,
  setLocalJournals,
  localJournals,
} from "./model/journals.js";

//Query Selectors===========================================================
//Sign in
const userNameInput = document.querySelector(".sign-in__user-name");
const passwordInput = document.querySelector(".sign-in__password");
const signInButton = document.querySelector(".sign-in__button");

//Init Modals===============================================================
export const newJournalModal = modal.createModal(
  "New JournAll",
  "",
  [{ type: "text", placeholder: "New JournAll", class: "modal__title-input" }],
  [
    {
      text: "Add JournAll",
      class: "button__add-journal",
    },
  ]
);

signInButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  checkForValidUser(userNameInput.value, passwordInput.value);
});

const refreshJournals = (newJournals = currentUser.journals) => {
  setLocalJournals(newJournals);
  renderJournals(localJournals);
};

const activateAddJournalModal = () => {
  const addJournalButton = document.querySelector(".button__add-journal");
  const journalTitleInput = document.querySelector(".modal__title-input");
  addJournalButton.addEventListener("click", (event) => {
    event.preventDefault();
    addNewJournal(journalTitleInput.value);
    activateJournals();
    clearModal();
  });
};

const activateJournalButton = () => {
  const newJournalButton = document.querySelector(".journals__add-button");
  newJournalButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderNewJournalModal(newJournalModal);
    activateAddJournalModal();
  });
};

export const activateJournals = () => {
  refreshJournals(currentUser.journals);
  activateJournalButton();
  const journalElements = document.querySelectorAll(".journals__title-div");
  journalElements.forEach((journal) =>
    journal.addEventListener("click", () => {
      const journalID = journal.dataset.id;
      const targetJournal = journals.find(
        (journal) => journal.title === journalID
      );
    })
  );
};
