import { reRenderApp } from "../views.js";

const noEntriesHTML = `<div class="journals__main">
<div class="journals__card">
<button class="button entries__add-button">Add Entry</button>
  <p>No Entries yet...</p>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 entries__back-arrow">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>
</div>
</div>`;

function generateEntriessHTML(entries = []) {
  return `<div class="journals__main">
    <div class="journals__card">
    <button class="button entries__add-button">Add Entry</button>
      ${entries
        .map((entry) => {
          return `<div class="journals__title-div" data-id="${entry.id}">
          <h2>${entry.title}</h2>
            <p>${entry.content}</p>
            <button class="entries__delete-btn">X</button>
        </div>`;
        })
        .join(" ")}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6             entries__back-arrow">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
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
