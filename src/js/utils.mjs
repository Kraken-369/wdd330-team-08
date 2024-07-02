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
  if (cart === null)
    cart = [];
  cart.push(newItem);
  setLocalStorage(key, cart);
  refreshHeader();
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

const getCartCounter = () => {
  const cart = JSON.parse(localStorage.getItem("so-cart"));
  return cart === null ? 0 : cart.length;
}

export const renderWithTemplate = (templateFn, parentElement, position = "afterbegin", clear = false) => {
  if (clear)
    parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, templateFn);
}

const loadTemplate = async path => {
  const html = await fetch(path);

  if (html.ok) {
    const template = await html.text();
    return template;
  }
}

export const loadHeaderFooter = async () => {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerContent = document.querySelector("#header-content");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerContent = document.querySelector("#footer-content");
  
  renderWithTemplate(headerTemplate, headerContent);
  renderWithTemplate(footerTemplate, footerContent);
  refreshHeader();
}

const refreshHeader = () => {
  const cartCounter = document.querySelector(".cart-counter");
  
  cartCounter.innerHTML = getCartCounter();
}