import { reRenderApp } from "../helpers.js";

const newJournalHTML = `<div class="new-journal__modal">
    <form class="new-journal__form">
            <div class="new-journal__input-div">
              <input
                class="new-journal__input new-journal__title"
                placeholder="New Journal"
                type="text"
              />
            </div>
            <div class="new-journal__buttons-div">
              <button class="button new-journal__button">Add JournAll</button>
            </div>
          </form>
</div>`;

export default function renderNewJournalModal() {
  reRenderApp(newJournalHTML);
}
