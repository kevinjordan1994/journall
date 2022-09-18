import { reRenderApp } from "../helpers.js";

const noJournalsHTML = `<div class="journals__main">
<div class="journals__card">
<button class="button journals__add-button">Add JournAll</button>
  <p>No JournAlls found...</p>
</div>
</div>`;

function generateJournalsHTML(journals = []) {
  return journals.map((journal) => {
    return `<div class="journals__main">
    <div class="journals__card">
    <button class="button journals__add-button">Add JournAll</button>
            <div class="journals__title-div" data-id="${journal.title}">
                <h2>${journal.title}</h2>
                <p>${journal.entries.length}${
      journal.entries.length === 1 ? "Entry" : "Entries"
    }</p>
            </div>
        </div>
    </div>`;
  });
}

export default function renderJournals(user) {
  const { journals } = user;
  if (!journals) {
    reRenderApp(noJournalsHTML);
    return;
  }
  reRenderApp(generateJournalsHTML(journals));
}
