import axios from "axios";

var ingredientServices = {
  endpoint: `https://ndb.nal.usda.gov/fdc-app.html#`
};


ingredientServices.getList = (ingredient) => {
  const config = {
    method: "GET",
    url: `${ingredientServices.endpoint}/?query=${ingredient}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
}

ingredientServices.getList = (id) => {
    const config = {
      method: "GET",
      url: `${ingredientServices.endpoint}/food-details/${id}/nutrients`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
}

export default ingredientServices