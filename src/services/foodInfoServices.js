import axios from "axios";
const apiKey = process.env.REACT_APP_FOOD_KEY;

var ingredientServices = {
     endpoint: `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}`
};


ingredientServices.getFoodInfo = (ingredient, pageSize, pageNumber) => {
  const config = {
    method: "GET",
    url: `${ingredientServices.endpoint}&dataType=Foundation, SR Legacy&pageSize=${pageSize}&pageNumber=${pageNumber}&query=${ingredient}`,
    headers: { 
      "Content-Type": "application/json"
    }
  };

  return axios(config);
}

ingredientServices.error = (response) => {
    console.log(response);
}

export default ingredientServices