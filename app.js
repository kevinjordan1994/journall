`use strict`;

import { renderModal } from "./view/renderModal.js";
import renderJournals, { deleteJournalHTML } from "./view/renderJournals.js";
import { clearModal } from "./view/renderModal.js";
import { checkForValidUser } from "./model/userValidation.js";
import { modal } from "./model/modal.js";
import {
  addNewJournal,
  setLocalJournals,
  localJournals,
  setTargetJournal,
  addNewEntry,
  targetJournal,
} from "./model/journals.js";
import renderEntries, { formatEntryText } from "./view/renderEntries.js";
import { renderError } from "./view/renderErrors.js";
import { replaceData } from "./model/fetchData.js";

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

export const newEntryModal = modal.createModal(
  "New Entry",
  "",
  [
    {
      type: "text",
      placeholder: "Title",
      class: "modal__entry__title-input",
    },
    {
      type: "text",
      placeholder: "What's on your mind?",
      class: "modal__entry__body-input",
      textarea: true,
    },
  ],
  [
    {
      text: "Add Entry",
      class: "button__add-entry",
    },
  ]
);

export const deleteJournalModal = modal.createModal(
  "Delete JournAll",
  "Are you sure?",
  null,
  [
    {
      text: "Yes",
      class: "button__confirm__delete-journal",
    },
    {
      text: "No",
      class: "button__deny__delete-journal",
    },
  ]
);

export const deleteEntryModal = modal.createModal(
  "Delete Entry",
  "Are you sure?",
  null,
  [
    {
      text: "Yes",
      class: "button__confirm__delete-entry",
    },
    {
      text: "No",
      class: "button__deny__delete-entry",
    },
  ]
);

signInButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  checkForValidUser(userNameInput.value, passwordInput.value);
  renderModal();
});

const activateAddJournalModal = () => {
  const addJournalButton = document.querySelector(".button__add-journal");
  const journalTitleInput = document.querySelector(".modal__title-input");
  addJournalButton.addEventListener("click", (event) => {
    event.preventDefault();
    addNewJournal(journalTitleInput.value);
    renderJournals(localJournals);
    activateJournalDivs();
    activateJournalButton();
    clearModal();
  });
};

const activateAddEntryModal = () => {
  const addEntryButton = document.querySelector(".button__add-entry");
  const entryTitleInput = document.querySelector(".modal__entry__title-input");
  const entryContentInput = document.querySelector(".modal__entry__body-input");
  addEntryButton.addEventListener("click", (event) => {
    event.preventDefault();
    const entryText = formatEntryText(entryContentInput.value);
    addNewEntry(entryTitleInput.value, entryText);
    clearModal();
    activateEntries(targetJournal.entries);
  });
};

const deleteJournal = () => {
  const filteredJournals = localJournals.filter(
    (journal) => journal.id !== targetJournal.id
  );
  deleteJournalHTML(targetJournal.id);
  setLocalJournals(filteredJournals);
  if (localJournals.length === 0) {
    activateJournals();
  }
  clearModal();
  replaceData(`journals.json`, localJournals);
};

const activateDeleteJournalModal = () => {
  const noButton = document.querySelector(".button__deny__delete-journal");
  const yesButton = document.querySelector(".button__confirm__delete-journal");
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearModal();
  });
  yesButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteJournal();
  });
};

const activateJournalButton = () => {
  const newJournalButton = document.querySelector(".journals__add-button");
  newJournalButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderModal(newJournalModal);
    activateAddJournalModal();
  });
};

const activateJournalDivs = () => {
  const journalElements = document.querySelectorAll(".journals__title-div");
  journalElements.forEach((journal) =>
    journal.addEventListener("click", (event) => {
      const journalID = journal.dataset.id;
      const targetJ = localJournals.find((journal) => journal.id === journalID);
      if (event.target.classList.contains("journals__delete-btn")) {
        renderModal(deleteJournalModal);
        setTargetJournal(targetJ);
        activateDeleteJournalModal();
        return;
      }
      activateEntries(targetJ.entries);
      setTargetJournal(targetJ);
    })
  );
};

const deleteEntry = (id) => {
  const otherJournals = localJournals.filter(
    (journal) => journal.id !== targetJournal.id
  );
  const updatedEntries = targetJournal.entries.filter(
    (entry) => entry.id !== id
  );
  targetJournal.entries = updatedEntries;
  setLocalJournals([targetJournal, ...otherJournals]);
  replaceData(`journals.json`, localJournals);
  deleteJournalHTML(id);
  clearModal();
};

const activateDeleteEntriesModal = (id) => {
  const noButton = document.querySelector(".button__deny__delete-entry");
  const yesButton = document.querySelector(".button__confirm__delete-entry");
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearModal();
  });
  yesButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteEntry(id);
  });
};

const activateDeleteEntriesButtons = () => {
  const entryDivs = document.querySelectorAll(".journals__title-div");
  entryDivs.forEach((div) =>
    div.addEventListener("click", (event) => {
      if (event.target.classList.contains("entries__delete-btn")) {
        event.preventDefault();
        renderModal(deleteEntryModal);
        activateDeleteEntriesModal(div.dataset.id);
      }
    })
  );
};

const activateEntriesButtons = () => {
  const backToJournalsButton = document.querySelector(".entries__back-arrow");
  const addEntryButton = document.querySelector(".entries__add-button");
  backToJournalsButton.addEventListener(`click`, activateJournals);
  addEntryButton.addEventListener("click", (event) => {
    event.preventDefault();
    renderModal(newEntryModal);
    activateAddEntryModal();
  });
};

export const activateEntries = (entries) => {
  renderEntries(entries);
  clearModal();
  activateEntriesButtons();
  activateDeleteEntriesButtons();
};

export const activateJournals = () => {
  renderJournals(localJournals);
  clearModal();
  activateJournalButton();
  activateJournalDivs();
};

export const handleError = (error) => {
  renderError(error, 5000);
  clearModal();
};
