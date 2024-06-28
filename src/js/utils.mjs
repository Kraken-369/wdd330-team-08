// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function appendToCart(key, newItem) {
  var cart = getLocalStorage(key);
  if (cart === null) cart = [];
  cart.push(newItem);
  setLocalStorage(key, cart);
}
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export const renderListWithTemplate = (templateFn, parentElement, list, position = "afterbegin", clear = false) => {
  const htmlString = list.map(templateFn);
  if (clear)
    parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export const renderWithTemplate = (templateFn, parentElement, data, callback) => {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  if (callback)
    callback(data)
}
export async function loadTemplate(path) {
  const response = await fetch(path).then(toText => toText.text());
  const template = document.createElement("template");
  template.innerHTML = response;
  return template;
}
export async function loadHeaderFooter() {
  const headerTem = await loadTemplate("templates/header.html");
  const footerTem = await loadTemplate("templates/footer.html");
  const getHeader = document.querySelector("#header");
  const getFooter = document.querySelector("#footer");
  renderWithTemplate(headerTem, getHeader);
  renderWithTemplate(footerTem, getFooter);
}