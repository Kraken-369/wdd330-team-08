export default class ProductListing {
    constructor(category, dataSource, elementTarget) {
        this.category = category;
        this.dataSource = dataSource;
        this.elementTarget = elementTarget;
    }
    async init() {
        const list = await this.dataSource.getData();
    }
}