import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const getElement = document.querySelector(".product-list");
const list = new ProductListing("tents", dataSource, getElement);

list.init();