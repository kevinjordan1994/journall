import { reRenderApp } from "../views.js";

const noJournalsHTML = `<div class="journals__main">
<div class="journals__card">
<button class="button journals__add-button">Add JournAll</button>
  <p class="journals__none-message">No JournAlls found...</p>
</div>
</div>`;

function generateJournalsHTML(journals = []) {
  return `<div class="journals__main">
    <div class="journals__card">
      <button class="button journals__add-button">Add JournAll</button>
      <div class="journals__inner-card">
      ${journals
        .map((journal) => {
          return `<div class="journals__title-div" data-id="${journal.id}">
          <div class="journals__journal-info">
          <h2 class="journals__title">${journal.title}</h2>
            <p>${journal.entries?.length || `No`} ${
            journal.entries?.length === 1 ? "Entry" : "Entries"
          }</p>
          </div>
          <div class="journals__btn-div">
          <button class="button journals__delete-btn">Delete</button>
          <button class="button journals__edit-btn">Edit</button>
          </div>
        </div>`;
        })
        .join(" ")}
        </div>
    </div>
    </div>`;
}

export default function renderJournals(journals = []) {
  if (journals.length < 1) {
    reRenderApp(noJournalsHTML);
    return;
  }
  reRenderApp(generateJournalsHTML(journals));
}

export function deleteJournalHTML(id) {
  const journalDivs = document.querySelectorAll(".journals__title-div");
  journalDivs.forEach((journal) => {
    if (journal.dataset.id === id) {
      journal.remove();
    }
  });
}
