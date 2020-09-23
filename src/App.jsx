import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Landing from './components/Landing';
import ShoppingList from './components/ShoppingList';
import MealGenerator from './components/mealGenerator/MealGenerator';
import Search from './components/Search/Search';
import MealViewer from './components/savedMeals/MealViewer';
import MealEditor from './components/savedMeals/MealEditor';
import Calendar from './components/Calendar';
import { Route, withRouter } from "react-router-dom";
import './App.css';

const Big = require('big.js') //probably want to remove the use of this.


class App extends React.Component {

  state = {
    ingredients:[],
    currentTabs: [],
    isSignedIn: false,
    nameMealEdited: "",
    editable: false,
  };


  handleUpdateName_ME = (e) => {
    this.setState(() => {
      return {
        mealName: e.target.value
      }
    })

  }

  handleNameInput_MG = (e) => {
    const target = e.target;
    const value = target.value;
    
    this.setState({
      mealName: value
    });
  }  

  handleSetName_ME = (name) => {

    this.setState(() => {
      return {
        mealName: name
      }

    })
  }

   handleEditablility = () => {
    
    this.setState((state) => {
      let makeEditable = !state.editable;

      return {
        editable: makeEditable

      }
    })

  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

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
    
    this.setState((state)=>{
      let macros = this.getMacros(ingredient);
      let itemAndMacros = { ingre: ingredient, itemMacro: macros }
      let addedIngredient = state.ingredients;
      addedIngredient.push(itemAndMacros)
      
      return {
        ingredients : addedIngredient
      }

    })
  }

  updateList = (newArr) => {
    this.setState(() => {
      return {
        ingredients: newArr
      }
    })

  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );

  }
  
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleUpdatePage = (newTabs) => {
        this.setState(() => {
            return {
                currentTabs: newTabs
            }
        })

  }

  render(){
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    
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
          path="/calendar"
          exact={true}
          render={(props) => (
            <Calendar />
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
          path="/mealGenerator"
          exact={true}
          render={(props) => (
            <MealGenerator 
              list={this.state.ingredients}
              updateList={this.updateList}
              history={this.props.history}
              handleNameInput_MG={this.handleNameInput_MG}
            />
          )}
        />
        <Route
          path="/search"
          exact={true}
          render={(props) => (
            <Search 
              addIngredient={this.addIngredient}
              handleUpdatePage={this.handleUpdatePage}
              currentTabs={this.state.currentTabs}
              history={this.props.history}
            />
          )}
        />
        <Route
          path="/mealViewer"
          exact={true}
          render={(props) => (
            <MealViewer
              updateList={this.updateList} 
              history={this.props.history}
              handleSetName_ME={this.handleSetName_ME}
            />
          )}
        />
        <Route
          path="/mealEditor"
          exact={true}
          render={(props) => (
            <MealEditor 
              list={this.state.ingredients}
              passedProps={this.props.location.passedProps}
              updateList={this.updateList}
              history={this.props.history}
              handleUpdateName_ME={this.handleUpdateName_ME}
              mealName={this.state.mealName}
              handleEditablility={this.handleEditablility}
              passedEditability={this.state.editable}
            />
          )}
        />
    </React.Fragment>
    );

  }  


}

export default withRouter(App);
