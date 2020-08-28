import axios from "axios";
const apiKey = 'k1bwOsN1KAIweQ9FQC5WezWjZpX6vNvldgsqlSLD'

var ingredientServices = {
     endpoint: `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}`
};


ingredientServices.getFoodInfo = (ingredient, pageSize, pageNumber) => {
  const config = {
    method: "GET",
    url: `${ingredientServices.endpoint}&dataType=Foundation, SR Legacy&pageSize=${pageSize}&pageNumber=${pageNumber}&query=${ingredient}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
}

ingredientServices.error = (response) => {
    console.log(response);
}

export default ingredientServices