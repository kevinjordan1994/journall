const errorDiv = document.querySelector(".errors");

const generateErrorHTML = (error) => {
  return `<div class="error__card">
  <div class="error__header">
    <h2>Error!</h2>
  </div>
  <div class="error__content"><p>${error}</p></div>
</div>`;
};

export const renderError = (error, time) => {
  clearErrorDiv();
  errorDiv.insertAdjacentHTML(`afterbegin`, generateErrorHTML(error));
  setTimeout(() => {
    const errorCard = document.querySelector(".error__card");
    errorCard.classList.add("error__hidden");
  }, time);
};

const clearErrorDiv = () => {
  errorDiv.innerHTML = "";
};
