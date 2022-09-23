`use strict`;
//#region Imports
import { renderModal } from "./view/renderModal.js";
import renderJournals, { deleteJournalHTML } from "./view/renderJournals.js";
import renderEntryPage from "./view/renderEntryPage.js";
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
//#endregion

//Sign in==================================================================
//#region Sign in
const userNameInput = document.querySelector(".sign-in__user-name");
const passwordInput = document.querySelector(".sign-in__password");
const signInButton = document.querySelector(".sign-in__button");

signInButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  checkForValidUser(userNameInput.value, passwordInput.value);
  renderModal();
});
//#endregion

//Init Modals===============================================================
//#region Modals
const newJournalModal = modal.createModal(
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

const deleteJournalModal = modal.createModal(
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

let editPlaceholder = "New Title";

const setEditPlaceholder = (string) => {
  editPlaceholder = string;
};

const editJournalModal = modal.createModal(
  "Edit JournAll",
  "",
  [
    {
      type: "text",
      placeholder: editPlaceholder,
      class: "modal__edit-title-input",
    },
  ],
  [
    {
      text: "Update JournAll",
      class: "button__edit-journal",
    },
    {
      text: "Cancel",
      class: "button__cancel__edit-journal",
    },
  ]
);

const deleteEntryModal = modal.createModal(
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
//#endregion

//Journal===================================================================
//#region Journal Functions
const updateJournalTitle = (value) => {
  if (value.trim().length === 0) {
    handleError("JournAll title can't be empty!");
    return;
  }
  const filteredJournals = localJournals.filter(
    (journal) => journal.id !== targetJournal.id
  );
  targetJournal.title = value;
  setLocalJournals([targetJournal, ...filteredJournals]);
  clearModal();
  renderJournals(localJournals);
  activateJournalDivs();
  activateJournalButton();
  replaceData(`journals.json`, localJournals);
};

const activateEditJournalModal = () => {
  const editedTitleInput = document.querySelector(".modal__edit-title-input");
  const updateJournalButton = document.querySelector(".button__edit-journal");
  const cancelButton = document.querySelector(".button__cancel__edit-journal");
  updateJournalButton.addEventListener("click", (event) => {
    event.preventDefault();
    updateJournalTitle(editedTitleInput.value);
    clearModal();
  });
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearModal();
  });
};

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
      setTargetJournal(targetJ);
      if (event.target.classList.contains("journals__delete-btn")) {
        renderModal(deleteJournalModal);
        activateDeleteJournalModal();
        return;
      }
      if (event.target.classList.contains("journals__edit-btn")) {
        setEditPlaceholder(targetJ.title);
        renderModal(editJournalModal);
        activateEditJournalModal();
        return;
      }
      if (event.target.classList.contains("journals__title")) {
        activateEntries(targetJ.entries);
      }
    })
  );
};
//#endregion

//Entries===================================================================
//#region Entry Functions
const activateAddEntryPage = () => {
  renderEntryPage();
  const addEntryButton = document.querySelector(".button__add-entry");
  const entryTitleInput = document.querySelector(".entry__input");
  const entryContentInput = document.querySelector(".entry__textarea");
  addEntryButton.addEventListener("click", (event) => {
    event.preventDefault();
    const entryText = formatEntryText(entryContentInput.value);
    addNewEntry(entryTitleInput.value, entryText);
    activateEntries(targetJournal.entries);
  });
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
    activateAddEntryPage();
  });
};
//#endregion

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
