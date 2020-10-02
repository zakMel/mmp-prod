import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {firestore} from './configFirebase';
import Landing from './components/Landing';
import ShoppingList from './components/ShoppingList';
import MealGenerator from './components/mealGenerator/MealGenerator';
import Search from './components/Search/Search';
import MealViewer from './components/savedMeals/MealViewer';
import MealEditor from './components/savedMeals/MealEditor';
import Calendar from './components/Calendar/Calendar';
import { Route, withRouter } from "react-router-dom";
import dbServices from './services/dbServices';
import './App.css';

const Big = require('big.js') //probably want to remove the use of this.
const db = firestore;

class App extends React.Component {

  state = {
    ingredients:[],
    currentTabs: [],
    isSignedIn: false,
    editable: false,
    mealName: "",
    calendarUpdate: {
      day: "",
      meal: "",
    },
    calendarDate: "date placeholder",
    calendarWeek:[
        {
          day: "Monday",
          Breakfast: "Breakfast",
          Lunch: "Lunch",
          Dinner: "Dinner",
        },
        {
          day: "Tuesday",
          Breakfast: "Breakfast",
          Lunch: "Lunch",
          Dinner: "Dinner",
        },
        {
          day: "Wednesday",
          Breakfast: "Breakfast",
          Lunch: "Lunch",
          Dinner: "Dinner",
        },
        {
          day: "Thursday",
          Breakfast: "Breakfast",
          Lunch: "Lunch",
          Dinner: "Dinner",
        },
        {
          day: "Friday",
          Breakfast: "Breakfast",
          Lunch: "Lunch",
          Dinner: "Dinner",
        },  
        {
          day: "Saturday",
          Breakfast: "Breakfast",
          Lunch: "Lunch",
          Dinner: "Dinner",
        },
        {
          day: "Sunday",
          Breakfast: "Breakfast",
          Lunch: "Lunch",
          Dinner: "Dinner",
        },

      ],
    dateRangeCal: [ new Date(), new Date () ],
    weekDateDB: ""
  };

  existingWeekCheck = () => {
    let user = firebase.auth().currentUser;
    const users = db.collection("users");
    let userFile = users.doc(`${user.uid}`);
    let weeks = userFile.collection("weeks");
    let query = weeks.where("weekDateDB", "==", this.state.weekDateDB)
    
    query.get()
    .then(this.handleQuerySuccess)
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  handleQuerySuccess = (response) => {
    console.log("week exists")
    
    response.forEach(doc => {
      if(doc.data().weekDateDB === this.state.weekDateDB){
        console.log(doc.data().weekDateDB, doc.data().calendarWeek)
        this.setState(() => {
            return {
              calendarWeek: doc.data().calendarWeek
            }
        })
      }
    })


  }

  saveWeekToDB = () => {
    console.log("clicked save week")
    let user = firebase.auth().currentUser;
    const users = db.collection("users");
    let userFile = users.doc(`${user.uid}`);

    let weeks = userFile.collection("weeks");
    let document = weeks.doc(`${this.state.weekDateDB}`);
    let state = this.state;

    dbServices.set(document, {
      weekDateDB: state.weekDateDB,
      dateRangeCal: state.dateRangeCal,
      calendarWeek: state.calendarWeek,
    })
  }

  setWeekDateRange = (newDates) => {

    let firstWeekDay = newDates[0].getDay();
        if(firstWeekDay === 1){
            this.setState(() => { 
              return {
                dateRangeCal : newDates,
                weekDateDB: JSON.stringify(newDates),
              }
            
            }, this.existingWeekCheck)
        } else {
            alert("must select a Monday as a start date.")
        }
  }

  updateDayMeal = (dayInput, mealInput) => {
    this.setState(()=>{
      return{
        calendarUpdate:{
          day: dayInput,
          meal: mealInput,
        }
      }
    })
  }

  updateWeekItem = (day, meal, update) => {
    console.log(day, meal, update);

    let updatedWeek = this.state.calendarWeek.map((item)=>{
      if(item.day === day) {
        item[`${meal}`] = update
      }
      return item;
    })

    console.log(updatedWeek)

    // this.setState(() => {
    //   return {
    //     calendarWeek : updatedWeek
    //   }
    // })

    // for(let i = 0; i < this.state.calendarWeek.length; i++){
    //   let current = this.state.calendarWeek[i];
    //   if(current.day === day){
    //     current.meal = update
    //   }
    // }
  }

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

  componentDidUpdate (prevProps, prevState) {
    if(this.state.selectedCalendarElement !== prevState.selectedCalendarElement){
      console.log(this.state.selectedCalendarElement)
    }
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
            <Calendar 
              history={this.props.history}
              weekDateRange={this.state.dateRangeCal}
              setWeekDateRange={this.setWeekDateRange}
              updateDayMeal={this.updateDayMeal}
              week={this.state.calendarWeek}
              date={this.state.calendarDate}
              update={this.state.calendarUpdate}
              saveWeekToDB={this.saveWeekToDB}
            />
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
              mealName={this.state.mealName}
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
              calendarUpdate={this.state.calendarUpdate}
              updateWeekItem={this.updateWeekItem}
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
              weekDateDB={this.state.weekDateDB}
            />
          )}
        />
    </React.Fragment>
    );

  }  


}

export default withRouter(App);
