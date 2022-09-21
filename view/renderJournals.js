import { reRenderApp } from "../views.js";

const noJournalsHTML = `<div class="journals__main">
<div class="journals__card">
<button class="button journals__add-button">Add JournAll</button>
  <p>No JournAlls found...</p>
</div>
</div>`;

function generateJournalsHTML(journals = []) {
  return `<div class="journals__main">
    <div class="journals__card">
      <button class="button journals__add-button">Add JournAll</button>
      ${journals
        .map((journal) => {
          return `<div class="journals__title-div" data-id="${journal.id}">
          <h2>${journal.title}</h2>
            <p>${journal.entries?.length || `No`} ${
            journal.entries?.length === 1 ? "Entry" : "Entries"
          }</p>
          <button class="journals__delete-btn">X</button>
        </div>`;
        })
        .join(" ")}
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
      if (journalDivs.length === 1) {
        journal.remove();
        reRenderApp(noJournalsHTML);
        return;
      }
      journal.remove();
    }
  });
}
