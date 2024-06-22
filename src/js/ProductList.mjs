import {renderListWithTemplate} from "./utils.mjs";

const productCardTemplate = (item) => `<list class="product-card">
  <a href="product_pages/?product=${item.Id}">
    <img src="${item.Image}" alt="${item.Name}" />
    <h3 class="card__brand">${item.Brand.Name}</h3>
    <h2 class="card__name">${item.Name}</h2>
    <p class="product-card__price">$${item.FinalPrice}</p>
  </a>
</list>`;

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  renderProductList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderProductList(list);
  }
}