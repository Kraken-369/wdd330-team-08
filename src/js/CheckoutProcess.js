import { formDataToJSON, getLocalStorage } from "./utils.mjs";
import { checkout } from "./ExternalServices.js";

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
        <p id="tax">$ ${(this.itemTotal * this.tax).toFixed(2)}</p>
      </li>
      <li>
        <label for="orderTotal"><b>Order Total</b></label>
        <p id="orderTotal">$ ${this.orderTotal.toFixed(2)}</p>
      </li>
    </ul>`;
		
		document.querySelector(`.${this.outputSelector}`).innerHTML = summary;
	}

	packageItems = () => {
		const objectItems = this.list.map(item => ({
				id: item.Id,
				price: item.FinalPrice,
				name: item.Name,
				quantity: 1
			}));
		
		return objectItems;
	}

	checkout = async () => {
    const formInputs = document.forms["checkout"];
		const json = formDataToJSON(formInputs);
    
		json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.itemTotal * this.tax;
    json.shipping = this.shipping;
		json.items = this.packageItems();
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
	}

}