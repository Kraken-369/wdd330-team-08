import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class Cart {
    constructor() {
        setLocalStorage('cart', []);
    }
    addToCart(product) {
        let shoppingCart = getLocalStorage('cart');
        shoppingCart.push(product);
        setLocalStorage('cart', shoppingCart);
        console.log(shoppingCart);
    }
    renderCartContents() {
        const cartItems = getLocalStorage('cart');
        const htmlItems = cartItems.map((item) => this.cartItemTemplate(item));
        document.querySelector('.product-list').innerHTML = htmlItems.join('');
    }

    cartItemTemplate(item) {
        const newItem = `<li class="cart-card-divider">
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
}