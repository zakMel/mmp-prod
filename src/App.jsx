import React from 'react';
import Landing from './components/Landing';
import ShoppingList from './components/ShoppingList';
import Meal from './components/mealGenerator/MealGenerator';
import Search from './components/Search/Search';
import { Route } from "react-router-dom";
import './App.css';
// import Ingredient from './components/mealGenerator/Ingredient';

const Big = require('big.js') //probably want to remove the use of this.


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      ingredients:[],
    };
  }
  
  getMacros = (ingredient) => {
    let nutrients = ingredient.foodNutrients;

    let protein = 0;
    let fat = 0;
    let carbs = 0;
    let x = 100

    nutrients.forEach(element => {
      if(element.nutrientName && element.nutrientName === 'Protein'){
        var p = new Big(element.value);
        protein = p / x ; 
      }

      else if(element.nutrientName && element.nutrientName === 'Total lipid (fat)'){
        var f = new Big(element.value);
        fat = f / x ;
      }

      else if(element.nutrientName && element.nutrientName === 'Carbohydrate, by difference'){
        var c = new Big(element.value);
        carbs = c / x ; 
      }

    })
    
    return {
      proteinPerGram : protein,
      fatPerGram: fat,
      carbsPerGram: carbs
    }

  }

  addIngredient = (ingredient) => {

    let macros = this.getMacros(ingredient);
    
    console.log(macros);

    this.setState((state)=>{
      let addedIngredient = state.ingredients;
      let itemAndMacros = { ingre: ingredient, itemMacro: macros }
      addedIngredient.push(itemAndMacros)
      
      return {
        ingredients : addedIngredient
      }

    })
  }

  render(){

    return (
    <React.Fragment>

        <Route
          path="/"
          exact={true}
          render={(props) => (
            <Landing />
          )}
        />
        <Route
          path="/shoppingList"
          exact={true}
          render={(props) => (
            <ShoppingList />
          )}
        />
        <Route
          path="/meal"
          exact={true}
          render={(props) => (
            <Meal 
              list={this.state.ingredients}
            />
          )}
        />
        <Route
          path="/search"
          exact={true}
          render={(props) => (
            <Search 
              addIngredient={this.addIngredient}
            />
          )}
        />
    </React.Fragment>
    );

  }  


}

export default App;
