import { reRenderApp } from "../views.js";

const noEntriesHTML = `<div class="journals__main">
<div class="journals__card">
<button class="button entries__add-button">Add Entry</button>
  <p>No Entries yet...</p>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 entries__back-arrow">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
</div>`;

const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon entries__delete-btn">
<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
`;

function generateEntriessHTML(entries = []) {
  return `<div class="journals__main">
    <div class="journals__card">
    <button class="button entries__add-button">Add Entry</button>
      ${entries
        .map((entry) => {
          return `<div class="journals__title-div" data-id="${entry.id}">
          <div class="entries__info">
          <h2>${entry.title}</h2>
            <p>${entry.content}</p>
            </div>
            <div class="journals__btn-div">
            <button class="button journals__delete-btn">Delete</button>
            </div>
        </div>`;
        })
        .join(" ")}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6             entries__back-arrow">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
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
