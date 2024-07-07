import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.js";

const checkoutProcess = new CheckoutProcess("so-cart", "checkout-summary", 0.06);
checkoutProcess.init();

document.querySelector("#checkout").addEventListener("click", e => {
    e.preventDefault();
    checkoutProcess.checkout();
})

loadHeaderFooter();