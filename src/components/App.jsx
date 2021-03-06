import React from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {firestore} from '../configFirebase'
import NavBar from './NavBar'
import Landing from './Landing';
import ShoppingList from './ShoppingList/ShoppingList';
import MealGenerator from './mealGenerator/MealGenerator';
import Search from './Search/Search'
import MealViewer from './savedMeals/MealViewer';
import MealEditor from './savedMeals/MealEditor';
import Calendar from './Calendar/Calendar';
import LoginUI from './LoginUI';
import uiLogo from "../pics/arm.png";
import Toast from './Toast'; //! remove this
import { Route, withRouter } from "react-router-dom";
import '../App.css'
import { Navbar } from 'react-bootstrap';

const Big = require('big.js') //todo probably want to remove the use of this.
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
    dateRangeCal: [ new Date(), new Date () ],
    weekDateDB: "",
    searching: false,
    checkedSl: [],
    loading: false,
    installButton: true,
    isLoading: true,
    cleanName: "",
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
  };


  componentDidMount() {
    console.log('loading')
  }
  
  // componentWillUnmount() {
  //   this.unregisterAuthObserver();
  // }

  handleSaving = () => {
    this.setState(()=> {
      return {
        loading: true
      }
    })

  }
  
  handleDoneSaving = () => {
    setTimeout(() => {

      this.setState(()=> {
        return {
          loading: false
        }
      })

    }, 500)
  }  

  handlingChecked = (e) => {
    let container = e.target.parentElement;
    let description = container.childNodes[1].innerHTML;
    if(!this.state.checkedSl.includes(description)){
      this.setState( (state) => {
        let newState = state.checkedSl;
        newState.push(description)
        return {
          checkedSl: newState
        }
      })
    }
  }

  handleSearching = (makeFalse) => {
    if(makeFalse === false){
      
      this.setState(() => {
        return {
          searching: false
        }
      })
    } else {
      this.setState(() => {
        return {
          searching: !this.state.searching
        }
      })
    }
  }

  resetCurrentTabs = () => {
    this.setState(() => {
      return {
        currentTabs: []
      }
    })
  }

  clearIngredients = () => {
    this.setState( () => {
      return {
        ingredients: [],
        mealName: "",
      }
    })

  }

  existingWeekCheck = () => {
    let user = firebase.auth().currentUser;
    const users = db.collection("users");
    let userFile = users.doc(`${user.uid}`);
    let weeks = userFile.collection("weeks");
    let document = weeks.doc(`${this.state.weekDateDB}`)
    let query = weeks.where("weekDateDB", "==", this.state.weekDateDB)

  document
  .get()
  .then(function(doc) {
    if (doc.exists) {
      return true;
    } else {
      console.log("No such document!");
      return false;
    }
  })
  .then((response)=>{
    if(response === true) {

      query.get()
      .then(this.handleQuerySuccess)
      .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    } else {
      this.setState(()=>{
        return {
          calendarWeek : [
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

        }

      })

    }

  })
  .catch(function(error) {
      console.log("Error getting document:", error);
  });
  }

  handleQuerySuccess = (response) => {
    response.forEach(doc => {
      if(doc.data().weekDateDB === this.state.weekDateDB){
        this.setState(() => {
            return {
              calendarWeek: doc.data().calendarWeek
            }
        })
      } else {
        return false;
      }
    })


  }

  updateCalendarWeek = (week) => {
    this.setState(() => {
      return {
        calendarWeek: week
      }
    })

  }

  saveWeekToDB = () => {
    let user = firebase.auth().currentUser;
    const users = db.collection("users");
    let userFile = users.doc(`${user.uid}`);

    
    if(this.state.weekDateDB.length>0){
      let weeks = userFile.collection("weeks");
      let document = weeks.doc(`${this.state.weekDateDB}`);
      let state = this.state;
      

    document.set({
      weekDateDB: state.weekDateDB,
      dateRangeCal: state.dateRangeCal,
      calendarWeek: state.calendarWeek,
    })
    .then(this.handleDoneSaving() )
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    } 
    
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

    this.state.calendarWeek.map((item)=>{
      if(item.day === day) {
        item[`${meal}`] = update
      }
      return item;
    })

  }

  handleUpdateName_ME = (e) => {
    let name = e.target.value;
    let regex = /&nbsp;/gi;
    let fixedName = name.replaceAll(regex, "")

    this.setState(() => {
      return {
        mealName: e.target.value,
        cleanName: fixedName
      }
    })

  }

  handleNameInput_MG = (e) => {
    let name = e.target.value;
    let regex = /&nbsp;/gi;
    let fixedName = name.replaceAll(regex, "")
    
    this.setState({
      mealName: e.target.value,
      cleanName: fixedName
    });
  }  

  handleSetName_ME = (name) => {
    let cleanName = name.trim();

    this.setState(() => {
      return {
        mealName: cleanName
      }

    })
  }

  handleEditablility = (makeFalse) => {
    if(makeFalse === false){
      
      this.setState(() => {
        return {
          editable: false
        }
      })
    } else {
      this.setState((state) => {
        let makeEditable = !state.editable;
  
        return {
          editable: makeEditable
  
        }
      })
      
    }
    

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

  handleUpdatePage = (newTabs) => {
        this.setState(() => {
            return {
                currentTabs: newTabs
            }
        })

  }

  render(){


    if (!this.props.isSignedIn || !firebase.auth().currentUser) {
      return (
        <React.Fragment>
          <Navbar />
          <img src={uiLogo} alt='logo' className="uiLogo" />
          <LoginUI />
        </React.Fragment>
      );
    } 
    
    return (
    <React.Fragment>

      <NavBar
        handleSearching={this.handleSearching}
        resetCurrentTabs={this.resetCurrentTabs}
        clearIngredients={this.clearIngredients}
      />
      
      <Route
        path="/"
        exact={true}
        render={(props) => (
          <Landing />
        )}
      />

      <Route  
        path="/toast"
        // exact={true}
        render={(props) => (
          <Toast />
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
            update={this.state.calendarUpdate}
            saveWeekToDB={this.saveWeekToDB}
            weekDateDB={this.state.weekDateDB}
            updateCalendarWeek={this.updateCalendarWeek}
            loading={this.state.loading}
            handleSaving={this.handleSaving}
          />
        )}
      />

      <Route
        path="/shoppingList"
        exact={true}
        render={(props) => (
          <ShoppingList 
            history={this.props.history}
            checkedSl={this.state.checkedSl}
            handlingChecked={this.handlingChecked}
            weekDateDB={this.state.weekDateDB}
            week={this.state.calendarWeek}
            weekDateRange={this.state.dateRangeCal}
            setWeekDateRange={this.setWeekDateRange}

          />
        )}
      />

      <Route
        path="/mealGenerator"
        render={(props) => (
          <MealGenerator 
            list={this.state.ingredients}
            updateList={this.updateList}
            history={this.props.history}
            handleNameInput_MG={this.handleNameInput_MG}
            mealName={this.state.mealName}
            addIngredient={this.addIngredient}
            handleUpdatePage={this.handleUpdatePage}
            currentTabs={this.state.currentTabs}
            clearIngredients={this.clearIngredients}
            handleSearching={this.handleSearching}
            searching={this.state.searching}
            resetCurrentTabs={this.resetCurrentTabs}
            loading={this.state.loading}
            handleSaving={this.handleSaving}
            handleDoneSaving={this.handleDoneSaving}
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
            handleSearching={this.handleSearching}
            resetCurrentTabs={this.resetCurrentTabs}
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
            handleEditablility={this.handleEditablility}
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
            loading={this.state.loading}
            handleSaving={this.handleSaving}
            handleDoneSaving={this.handleDoneSaving}
            cleanName={this.state.cleanName}
          />
        )}
      />

    </React.Fragment>
    );
  
  }

}

export default withRouter(App);
