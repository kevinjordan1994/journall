import { fetchData } from "./fetchData.js";
import { currentUser } from "./userValidation.js";

export let localJournals = [];

export function addNewJournal(journalTitle) {
  if (journalTitle.trim().length < 1) {
    console.log("Please Enter A Valid Name");
    return;
  }
  sendJournalToDatabase(currentUser.userName, journalTitle);
}

export const createJournalsArray = (journalsObject) => {
  const journalsArray = [];
  for (const journal in journalsObject) {
    journalsArray.push(journalsObject[journal]);
  }
  return journalsArray;
};

export function setLocalJournals(journals) {
  localJournals = createJournalsArray(journals);
}

export function reFetchJournals(userName) {
  const newJournals = fetchData(`users/${userName}/journals.json`);
  return createJournalsArray(newJournals);
}

const sendJournalToDatabase = (userName, journalTitle) => {
  fetchData(`users/${userName}/journals.json`, {
    title: journalTitle,
    entries: [],
  });
};
