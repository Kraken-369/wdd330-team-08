const baseURL = import.meta.env.VITE_SERVER_URL;

const convertToJson = async res => {
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {

  getData = async category => {
    const res = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(res);

    return data.Result;
  }

  findProductById = async id => {
    const res = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(res);

    return data.Result;
  }

  checkout = async payload => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }

}