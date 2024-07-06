import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  
	constructor(key, outputSelector, tax) {
		this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = tax;
    this.orderTotal = 0;
  }

  init = () => {
		this.list = getLocalStorage(this.key);
		this.calculateSubTotal();
	}

	calculateSubTotal = () => {
		this.list.map(item => this.itemTotal += item.FinalPrice);
		this.shipping = 10 + (this.list.length - 1) * 2;
		this.calculateOrderTotal();
	}

	calculateOrderTotal = () => {
		this.orderTotal = this.shipping + this.itemTotal * this.tax + this.itemTotal;
		this.displayOrderTotal();
	}

	displayOrderTotal = () => {
		const summary = `
		<h3>Order Summary</h3>
    <ul>
      <li>
        <label for="cartTotal">Item Subtotal(${this.list.length})</label>
        <p name="cartTotal" id="cartTotal">$ ${this.itemTotal}</p>
      </li>
      <li>
        <label for="shipping">Shipping Estimate</label>
        <p id="shipping">$ ${this.shipping}</p>
      </li>
      <li>
        <label for="tax">Tax</label>
        <p id="tax">$ ${this.tax}</p>
      </li>
      <li>
        <label for="orderTotal"><b>Order Total</b></label>
        <p id="orderTotal">$ ${this.orderTotal.toFixed(2)}</p>
      </li>
    </ul>`;
		
		document.querySelector(`.${this.outputSelector}`).innerHTML = summary;
	}

}