import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import {loadHeaderFooter} from "./utils.mjs";

const product = "tents";
const dataSource = new ProductData(product);
const listElement = document.querySelector(".product-list")
const productList = new ProductListing(product, dataSource, listElement);

loadHeaderFooter();
productList.init();