import { fetchData, replaceData } from "./fetchData.js";
import { currentUser } from "./userValidation.js";
import { generateId } from "../helpers.js";

export let localJournals = [];
export let targetJournal = null;

export function addNewJournal(journalTitle) {
  if (journalTitle.trim().length < 1) {
    throw new Error("JournAll must have a title!");
  }
  const journalId = generateId();
  sendJournalToDatabase(journalTitle, journalId);
  setLocalJournals([
    ...localJournals,
    {
      title: journalTitle,
      id: journalId,
      author: currentUser.userName,
    },
  ]);
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

export function setTargetJournal(journal) {
  targetJournal = journal;
}

export function addNewEntry(title, content) {
  const newEntry = {
    title,
    content,
    id: generateId(),
  };
  sendEntryToDatabase(newEntry);
}

const sendJournalToDatabase = (journalTitle, id) => {
  fetchData(`journals.json`, {
    title: journalTitle,
    id,
    author: currentUser.userName,
  });
};

const sendEntryToDatabase = (entry) => {
  const filteredJournals = localJournals.filter(
    (journal) => journal.id !== targetJournal.id
  );
  if (!targetJournal.entries) targetJournal.entries = [];
  targetJournal.entries.push(entry);
  setLocalJournals([...filteredJournals, targetJournal]);
  replaceData(`journals.json`, localJournals);
};

export const filterLocalJournals = (journalsObject) => {
  const journalsArray = createJournalsArray(journalsObject).filter(
    (journal) => journal.author === currentUser.userName
  );
  setLocalJournals(journalsArray);
};
