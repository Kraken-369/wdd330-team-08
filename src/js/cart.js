import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

//TODO: Object promise issue when a new item is added to cart,
//TODO : the cart is not updated with the new item
//TODO : The cart is not being initialized from where I wanted it, so I will figure it out tomororw.
const dataSource = new ProductData("tents");
const cartElement = document.querySelector(".product-list");
const cart = new ShoppingCart(dataSource, cartElement);

async function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cart.init();
    // checkCartDuplicates(htmlItems);
    document.querySelector(".product-list").append(htmlItems);
  } else {
    document.querySelector(".product-list").innerHTML = "Your cart is empty!";
  }
}

async function checkCartDuplicates(items) {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const cartItemsIds = cartItems.map((item) => {
      if (item.Id === cartItems) {
        document.querySelector(".cart-card__quantity").textContent = "Quantity: " + 1;
      } else {
        document.querySelector(".product-list").append(items);
      }
    });
  }
}
renderCartContents();
