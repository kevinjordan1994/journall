`use strict`;
//#region Imports
import { renderModal } from "./view/renderModal.js";
import renderJournals, { deleteJournalHTML } from "./view/renderJournals.js";
import renderEntryPage from "./view/renderEntryPage.js";
import { clearModal } from "./view/renderModal.js";
import { addNewUser, checkForValidUser } from "./model/userValidation.js";
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
import toggleNav from "./view/toggleNav.js";
//#endregion

//Sign in==================================================================
//#region Sign in
const userNameInput = document.querySelector(".sign-in__user-name");
const passwordInput = document.querySelector(".sign-in__password");
const newUserNameInput = document.querySelector(".sign-up__user-name");
const newPasswordInput = document.querySelector(".sign-up__password");
const signInButton = document.querySelector(".sign-in__button");
const signUpButton = document.querySelector(".sign-up__btn");
const goToSignUpButton = document.querySelector(".sign-up__go-to");
const goToSignInButton = document.querySelector(".sign-in__go-to");
const toggleSignUpMenusButtons = [goToSignInButton, goToSignUpButton];

const toggleSignUpMenus = () => {
  document.querySelector(".sign-in").classList.toggle("hidden");
  document.querySelector(".sign-up").classList.toggle("hidden");
};

signInButton.addEventListener(`click`, (event) => {
  event.preventDefault();
  checkForValidUser(userNameInput.value, passwordInput.value);
  renderModal();
});

signUpButton.addEventListener("click", (event) => {
  event.preventDefault();
  addNewUser(newUserNameInput.value, newPasswordInput.value);
  renderModal();
});

toggleSignUpMenusButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    toggleSignUpMenus();
  });
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

const warningModal = modal.createModal(
  "Warning!",
  "You're changes will not be saved. Are you sure?",
  null,
  [
    {
      text: "Yes",
      class: "button__confirm__warning",
    },
    {
      text: "No",
      class: "button__deny__warning",
    },
  ]
);
//#endregion

//#region Helpers

const checkForBlankInputs = (...inputs) => {
  let isBlankInput = false;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      handleError(`Can't submit with blank inputs.`);
      isBlankInput = true;
    }
  });
  return isBlankInput;
};

const filterJournals = (id) => {
  return localJournals.filter((journal) => journal.id !== id);
};

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
    try {
      addNewJournal(journalTitleInput.value);
    } catch (error) {
      handleError(error.message);
    }
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
  const cancelEntryButton = document.querySelector(".button__cancel-entry");
  const entryTitleInput = document.querySelector(".entry__input");
  const entryContentInput = document.querySelector(".entry__textarea");
  addEntryButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (checkForBlankInputs(entryContentInput, entryTitleInput)) return;
    const entryText = formatEntryText(entryContentInput.value);
    addNewEntry(entryTitleInput.value, entryText);
    activateEntries(targetJournal.entries);
  });
  cancelEntryButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      entryTitleInput.value.trim().length === 0 &&
      entryContentInput.value.trim().length === 0
    ) {
      activateEntries(targetJournal.entries);
      return;
    }
    renderModal(warningModal);
    activateWarningModal();
  });
};

const activateWarningModal = () => {
  const yesButton = document.querySelector(".button__confirm__warning");
  const noButton = document.querySelector(".button__deny__warning");
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearModal();
  });
  yesButton.addEventListener("click", (event) => {
    event.preventDefault();
    activateEntries(targetJournal.entries);
  });
};

const activateEditEntryPage = (id) => {
  const targetEntry = targetJournal.entries.find((entry) => entry.id === id);
  renderEntryPage(targetEntry.title, targetEntry.content);
  const addEntryButton = document.querySelector(".button__add-entry");
  const cancelEntryButton = document.querySelector(".button__cancel-entry");
  const entryTitleInput = document.querySelector(".entry__input");
  const entryContentInput = document.querySelector(".entry__textarea");
  addEntryButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (checkForBlankInputs(entryContentInput, entryTitleInput)) return;
    const updatedEntry = {
      title: entryTitleInput.value,
      content: formatEntryText(entryContentInput.value),
      id,
    };
    const filteredEntries = targetJournal.entries.filter(
      (entry) => entry.id !== id
    );
    targetJournal.entries = [updatedEntry, ...filteredEntries];
    const otherJournals = filterJournals(targetJournal.id);
    setLocalJournals([targetJournal, ...otherJournals]);
    activateEntries(targetJournal.entries);
    replaceData(`journals.json`, localJournals);
  });
  cancelEntryButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      entryTitleInput.value.trim().length === 0 &&
      entryContentInput.value.trim().length === 0
    ) {
      activateEntries(targetJournal.entries);
      return;
    }
    renderModal(warningModal);
    activateWarningModal();
  });
};

const deleteEntry = (id) => {
  const otherJournals = filterJournals(targetJournal.id);
  const updatedEntries = targetJournal.entries.filter(
    (entry) => entry.id !== id
  );
  targetJournal.entries = updatedEntries;
  setLocalJournals([targetJournal, ...otherJournals]);
  replaceData(`journals.json`, localJournals);
  deleteJournalHTML(id);
  if (targetJournal.entries.length === 0) {
    activateEntries(targetJournal.entries);
  }
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

const activateDeleteAndEditEntriesButtons = () => {
  const entryDivs = document.querySelectorAll(".entries__title-div");
  entryDivs.forEach((div) =>
    div.addEventListener("click", (event) => {
      if (event.target.classList.contains("entries__delete-btn")) {
        event.preventDefault();
        renderModal(deleteEntryModal);
        activateDeleteEntriesModal(div.dataset.id);
      }
      if (event.target.classList.contains("entries__edit-btn")) {
        activateEditEntryPage(div.dataset.id);
        return;
      }
    })
  );
};

const activateEntriesButtons = () => {
  const backToJournalsButton = document.querySelector(".nav__back-arrow");
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
  activateDeleteAndEditEntriesButtons();
};

export const activateJournals = () => {
  renderJournals(localJournals);
  if (document.querySelector(".nav").classList.contains("hidden")) {
    toggleNav();
  }
  clearModal();
  activateJournalButton();
  activateJournalDivs();
};

export const handleError = (error) => {
  renderError(error, 5000);
  clearModal();
};
