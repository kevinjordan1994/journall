const modalDiv = document.querySelector(".modal");
const backdrop = document.querySelector(".modal__backdrop");

const generateModalHTML = (modal = { title: "Loading" }) => {
  return `<div class="modal__window">
    <div class="modal__header">
      <h2 class="modal__title">${modal.title}</h2>
    </div>
    <form>
    <div class="modal__content-div">
      ${modal.content ? `<p class="modal__content">${modal.content}</p>` : ""}
      ${modal.inputs ? generateInputs(modal.inputs) : ""}
    </div>
    <div class="modal__button-div">
    ${
      modal.buttons
        ? modal.buttons
            .map((button) => {
              return `<button class="button modal__button ${button.class}">${button.text}</button>`;
            })
            .join(" ")
        : ""
    }
    </div>
    </form>
    </div>`;
};

export function renderModal(modalData) {
  backdrop.classList.remove("hidden");
  modalDiv.insertAdjacentHTML(`afterbegin`, generateModalHTML(modalData));
}

export function clearModal() {
  const modalWindow = document.querySelector(".modal__window");
  if (!modalWindow) return;
  backdrop.classList.add("hidden");
  modalWindow.remove();
}

function generateInputs(inputs) {
  let inputsHTML = "";
  inputs.forEach((input) => {
    if (input.textarea) {
      inputsHTML += `<textarea class="modal__textarea ${input.class}" type="${input.type}" placeholder="${input.placeholder}"></textarea>`;
    } else {
      inputsHTML += `<input maxlength="15" class="modal__input ${input.class}" type="${input.type}" placeholder="${input.placeholder}"/>`;
    }
  });
  return inputsHTML;
}

backdrop.addEventListener("click", clearModal);
