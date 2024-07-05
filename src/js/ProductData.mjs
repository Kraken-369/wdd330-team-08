const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
  }
  getData(path) {
    return fetch(baseURL + path)
      .then(convertToJson)
      .then((data) => data.Result);
  }
  async findProductById(id) {
    const products = await this.getData(`product/${id}`);
    return products;
  }
}
