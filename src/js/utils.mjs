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
<<<<<<< HEAD
export function appendToCart(key, newItem) {
  var cart = getLocalStorage(key);
=======

// add new item to cart list
export const appendToCart = (key, newItem) => {
  let cart = getLocalStorage(key);

>>>>>>> 49c0ecd577bb60c9d0a4f67ff16a749c0307d5ec
  if (cart === null) cart = [];
  cart.push(newItem);
  setLocalStorage(key, cart);
}
<<<<<<< HEAD
=======

// set a listener for both touchend and click
>>>>>>> 49c0ecd577bb60c9d0a4f67ff16a749c0307d5ec
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
