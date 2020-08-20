import React from 'react';
import Landing from './components/Landing';
import ShoppingList from './components/ShoppingList';
import Meal from './components/MealGenerator/MealGenerator';
import Search from './components/Search/Search';
import { Route } from "react-router-dom";
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      searchInput: '',
    };
  }

  handleIngredientSearch = (ingredient) => {
    this.setState( (state, props) => {
      return {
        searchInput : ingredient
      }
    });

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
            <Meal />
          )}
        />
        <Route
          path="/search"
          exact={true}
          render={(props) => (
            <Search 
              passIngredient={this.handleIngredientSearch}
            />
          )}
        />
    </React.Fragment>
    );

  }  


}

export default App;
