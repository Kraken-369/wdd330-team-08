import { renderListWithTemplate } from "./utils.mjs";

const productInCartTemplate = (item) => `
<li class="cart-card divider">
    <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}"/>
    </a>
    <a href="/product_pages/?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">Quantity: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
</li>
`;

export default class CartListing {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    renderCartList(list) {
        renderListWithTemplate(productInCartTemplate, this.listElement, list);
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderCartList(list);
    }
}