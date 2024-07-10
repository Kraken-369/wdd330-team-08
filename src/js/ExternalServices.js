const baseURL = import.meta.env.VITE_SERVER_URL;

const convertToJson = res => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export const checkout = async payload => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
	
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}