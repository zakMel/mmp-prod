import React from 'react';
import Landing from './components/Landing'
import ShoppingList from './components/ShoppingList'
import { Route } from "react-router-dom";
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {};
  }
  
  componentDidMount(){
  }

  render(){
    return (
    <React.Fragment>

        <Route
          path="/"
          exact='true'
          render={(props) => (
            <Landing />
          )}
        />
        <Route
          path="/shoppingList"
          exact='true'
          render={(props) => (
            <ShoppingList />
          )}
        />
        {/* <Route
          path="/calendar"
          exact='true'
          render={(props) => (
            <Calendar />
          )}
        /> */}
        {/* <Route
          path="/"
          exact='true'
          render={(props) => (
            <SavedMeals />
          )}
        /> */}
    </React.Fragment>
    );
  }  


}

export default App;
