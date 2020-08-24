import React from 'react';
import Landing from './components/Landing';
import ShoppingList from './components/ShoppingList';
import Meal from './components/mealGenerator/MealGenerator';
import Search from './components/Search/Search';
import { Route } from "react-router-dom";
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      ingredients:[],
    };
  }

  addIngredient = (ingredient) => {
    this.setState((state)=>{
      let addedIngredient = state.ingredients;
      addedIngredient.push(ingredient)
      
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
