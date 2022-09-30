import { reRenderApp } from "../views.js";

const noEntriesHTML = `<div class="journals__main">
<div class="journals__card">
<button class="button entries__add-button">Add Entry</button>
  <p class="journals__none-message">No Entries yet...</p>
  </div>
</div>`;

function generateEntriessHTML(entries = []) {
  return `<div class="journals__main">
    <div class="journals__card">
    <button class="button entries__add-button">Add Entry</button>
      ${entries
        .map((entry) => {
          return `<div class="entries__title-div" data-id="${entry.id}">
          <div class="entries__header">
          <h2>${entry.title}</h2>
          <div class="journals__btn-div">
          <button class="button entries__delete-btn">Delete</button>
          <button class="button entries__edit-btn">Edit</button>
          </div>
            </div>
          <p class="entries__text-content">${entry.content}</p>
        </div>`;
        })
        .join(" ")}
        </div>
    </div>`;
}

export default function renderEntries(entries = []) {
  if (entries.length < 1) {
    reRenderApp(noEntriesHTML);
    return;
  }
  reRenderApp(generateEntriessHTML(entries));
}

export function formatEntryText(text) {
  text = text.replace(/\n/g, "<br>");
  return text;
}
