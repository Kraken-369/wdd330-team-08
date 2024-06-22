function createCard(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product}">
        <img src="product_pages/" alt="Image of ">
    `
}
export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
    }
}