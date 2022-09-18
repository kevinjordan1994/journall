const appEl = document.querySelector(".app__container");

export function clearAppHTML() {
  appEl.innerHTML = "";
}

export function reRenderApp(html) {
  clearAppHTML();
  appEl.insertAdjacentHTML(`afterbegin`, html);
}
