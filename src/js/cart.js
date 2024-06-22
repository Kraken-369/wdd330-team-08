import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    renderCartTotal();
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML = "Your cart is empty!";
  }
}
function renderCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  var subtotal = 0;
  var taxRate = .056;
  cartItems.map((item) => {
    subtotal += parseFloat(item.FinalPrice);
  })
  var taxedTotal = parseFloat(subtotal * taxRate).toFixed(2);
  const totals = `
  <p>Subtotal: $${subtotal}</p>
  <p>Taxes: $${taxedTotal}</p>
  <p>Total: $${subtotal + parseFloat(taxedTotal)}</p>
  `
  document.querySelector(".totals").innerHTML = totals;
}
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
renderCartContents();
