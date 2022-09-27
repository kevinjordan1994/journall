import { reRenderApp } from "../views.js";

const generateAddEntryHTML = (titleValue, contentValue) => {
  const isUpdating = titleValue || contentValue;
  return `<div class="journals__main">
    <div class="entry__card">
    <form class="entry__form">
    <div class="entry__inputs>
      <div class="entry__title-input">
      <input class="entry__input" ${
        titleValue ? `value="${titleValue}"` : `placeholder="Entry Title"`
      }></input>
      </div>
      <div class="entry__content-input">
      <textarea class="entry__textarea" placeholder="What's on your mind?"
      }>${contentValue ? contentValue : ""}</textarea>
      </div>
      <div class="entry__btn-div">
        <button class="button button__add-entry">${
          isUpdating ? "Update Entry" : "Add Entry"
        }</button>
        <button class="button button__cancel-entry">Cancel</button>
      </div>
    </div>
    </form>
    </div>
    </div>`;
};

export default function renderEntryPage(
  titleValue = null,
  contentValue = null
) {
  reRenderApp(generateAddEntryHTML(titleValue, contentValue));
}
