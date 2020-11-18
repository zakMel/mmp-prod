import React from "react";
import firebase from 'firebase';
import {firestore} from '../../configFirebase';
import { NavLink } from "react-router-dom";
import $ from "jquery"
import InfiniteScroll from 'react-infinite-scroller';
import dbServices from '../../services/dbServices';
import PieChart from '../PieChart';
import ContentEditable from 'react-contenteditable'
import Ingredient from './Ingredient'
import "../../App.css";
import "../../style/savedMeals.css";
const db = firestore;

class MealEditor extends React.Component {
    
  state = { 
    mealName: '',
    shownIngredients: [],
    savedIngredients: [],
    mealMacros: {
      protein: 0,
      fat: 0,
      carbs: 0
    },
  }

  componentDidMount(){ 
    this.renderDOM() 
  }
  
  renderDOM = () => {
    let name =this.props.mealName;
    let givenIngredients = this.props.passedProps.savedIngredients; 
    let mappedList  = givenIngredients.map(ingre => this.renderIngredients(ingre)); 
    let macros = this.props.passedProps !== undefined ? this.props.passedProps.mealMacros : this.state.mealMacros
    let passedEditability = this.props.passedEditability;
    
    this.setState(() => {
      
      return {
        mealName: name,
        shownIngredients : mappedList,
        savedIngredients : givenIngredients,
        mealMacros: {
          protein: macros.protein,
          fat: macros.fat,
          carbs: macros.carbs,
        },
        editable: passedEditability,
      }
    })
    
  }

  addMacros = (ingredient) => {
    
    this.setState((state) => {
      
      let macros = ingredient.itemMacro; 
      let stateMacros = state.mealMacros; 
      
      let newProtein = ( stateMacros.protein ) + ( macros.proteinPerGram )
      let newFat = ( stateMacros.fat ) + ( macros.fatPerGram)
      let newCarbs = ( stateMacros.carbs ) + ( macros.carbsPerGram)
      
      return {
        
        mealMacros: {
          protein: newProtein,
          fat: newFat,
          carbs: newCarbs
        },
      }
      
    })
    
  }

  renderIngredients = (ingredient) => {

      this.addMacros(ingredient)

      return (
      <Ingredient
      passedEditability={this.props.passedEditability}
      ingredient={ingredient.ingre}
      description={ingredient.ingre.description}
      nutrients={ingredient.ingre.foodNutrients}
      addingGrams={this.addingGrams} 
      renderDOM={this.renderDOM}
      macros={ingredient.itemMacro}
      exitIngreInput={this.exitIngreInput}
      enterIngreInput={this.enterIngreInput}
      handleDeleteFromDOM={this.handleDeleteFromDOM}
      />
      
      );
  };

  enterIngreInput = (e, macros) => {
    let grams = e.target.value;
    
    if(grams === "") {

      this.setState((state) => {
        let stateMacros = state.mealMacros; 
        
        let newProtein = ( stateMacros.protein ) - ( macros.proteinPerGram )
        let newFat = ( stateMacros.fat ) - ( macros.fatPerGram)
        let newCarbs = ( stateMacros.carbs ) - ( macros.carbsPerGram)
        
        return {
          
          mealMacros: {
            protein: newProtein,
            fat: newFat,
            carbs: newCarbs
          },
        }
        
      })

    } else {

      this.setState((state) => {
        
        let stateMacros = state.mealMacros; 
        
        let newProtein = ( stateMacros.protein ) - (macros.proteinPerGram * grams)
        let newFat = ( stateMacros.fat ) - (macros.fatPerGram * grams)
        let newCarbs = ( stateMacros.carbs ) - (macros.carbsPerGram * grams)
        
        return {
          
          mealMacros: {
            protein: newProtein,
            fat: newFat,
            carbs: newCarbs
          },
        }
        
      })

    }
    
  }

  exitIngreInput = (e, macros) => {

    let grams = e.target.value;

    if(grams === "") {

      this.setState((state) => {
        let stateMacros = state.mealMacros; 
        
        let newProtein = ( stateMacros.protein ) + ( macros.proteinPerGram )
        let newFat = ( stateMacros.fat ) + ( macros.fatPerGram)
        let newCarbs = ( stateMacros.carbs ) + ( macros.carbsPerGram)
        
        return {
          
          mealMacros: {
            protein: newProtein,
            fat: newFat,
            carbs: newCarbs


          },
        }
        
      })

    } else {

      this.setState((state) => {
        
        let stateMacros = state.mealMacros; 
        
        let newProtein = ( stateMacros.protein ) + (macros.proteinPerGram * grams)
        let newFat = ( stateMacros.fat ) + (macros.fatPerGram * grams)
        let newCarbs = ( stateMacros.carbs ) + (macros.carbsPerGram * grams)
        
        return {
          
          mealMacros: {
            protein: newProtein,
            fat: newFat,
            carbs: newCarbs
          },
        }
        
      })

    }
    
  }
  
  handleDeleteFromDOM = (e, macros) => {
    
    let container = e.target.parentElement;
    let grams = $(container).children().filter("input.IngreEditGrams_ME")[0].value;
    let desRef = $(container).children().filter("div.prevIngreDescription")[0].innerText;
    console.log(grams, desRef);
    //removes macros
    if(grams !== ""){
      this.setState( (state) => {
        return {
          mealMacros: {
            protein: (state.mealMacros.protein) - (macros.proteinPerGram * grams),
            fat: (state.mealMacros.fat) - (macros.fatPerGram * grams),
            carbs: (state.mealMacros.carbs) - (macros.carbsPerGram * grams)
          }
        }
      })

    } else {
      this.setState( (state) => {
        return {
          mealMacros: {
            protein: (state.mealMacros.protein) - macros.proteinPerGram,
            fat: (state.mealMacros.fat) - macros.fatPerGram,
            carbs: (state.mealMacros.carbs) - macros.carbsPerGram
          }
        }
      })

    }

    //removes from the mealEditor.jsx 
    let newRender = [];

    for ( let u = 0; u < this.state.shownIngredients.length;  u++) {
      let arr = this.state.shownIngredients;
      let current = arr[u];
      let found = current.props.description === desRef;
    
      if(!found){
        newRender.push(current)
      }  

    }

    console.log(newRender);

    this.setState( () => {

      return {
        shownIngredients: newRender
      }

    })

    //delete from App.jsx
    let newList = []
    for ( let i = 0; i < this.props.passedProps.savedIngredients.length; i++ ){ 
      let arr = this.props.passedProps.savedIngredients;
      let current = arr[i];
      let ingredent = arr[i].ingre;
      let found = ingredent.description === desRef;

      if(!found){
        newList.push(current);
      }
    }

    this.props.updateList(newList);

  }
  
  reRenderList = () => {
    
    this.setState(()=>{
      let reMappedList  = this.props.passedProps.savedIngredients.map(ingre => this.renderIngredients(ingre)); 

      return {
        shownIngredients: reMappedList
      }

    })

  }

  componentDidUpdate (prevProps, prevState) {

    if(this.state.savedIngredients.length !== prevState.savedIngredients.length){
      this.setState(()=>{
        return {
          mealMacros: {
            protein: 0,
            fat: 0,
            carbs: 0
          }
        }
      }, this.reRenderList())
    }

    else if (this.props.passedEditability !== prevProps.passedEditability){
      this.setState(()=>{
        return {
          mealMacros: {
            protein: 0,
            fat: 0,
            carbs: 0
          }
        }
      }, this.reRenderList())
    }

  }
  
  sendToDatabase = () => {
    let user = firebase.auth().currentUser;
    const userFile = db.collection("users").doc(`${user.uid}`);
    let meals = userFile.collection("meals");
    let prevDoc = meals.doc(`${this.state.mealName}`);

    prevDoc.get()
    .then(this.checkMealExistance)
    .then(this.handleBatching)
    .then(this.props.handleDoneSaving())
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

  }

  checkMealExistance = (doc) => {

    if(!doc.exists){
      let user = firebase.auth().currentUser;
      const userFile = db.collection("users").doc(`${user.uid}`);
      let meals = userFile.collection("meals");
      let document = meals.doc(`${this.props.mealName}`);
      let state = this.state;
      
      dbServices.set(document, {
        mealName: this.props.cleanName,
        savedIngredients: state.savedIngredients,
        mealMacros: state.mealMacros,
      })
      
    } else {
      return true;
    } 
  }
  
  handleBatching = async exists => {
    let user = firebase.auth().currentUser;
    const userFile = db.collection("users").doc(`${user.uid}`);
    let meals = userFile.collection("meals");
    let weeks = userFile.collection("weeks");
    let newMeal = this.props.cleanName.length > 0 ? meals.doc(`${this.props.cleanName}`) : meals.doc(`${this.props.mealName}`);
    console.log(newMeal);
    let targetMeal = meals.doc(`${this.props.passedProps.mealName}`);
    let state = this.state;
    var batch = db.batch()
    
    if(exists){
      let newDoc = {};
      let weekEdited = false;

      //updates weeks with changes to a meal.
      await weeks.get()  
      .then((week) => {
        week.forEach(doc => {
          let calendarWeek = doc.data().calendarWeek
          // adding uneffected props to newDoc
          newDoc.dateRangeCal = doc.data().dateRangeCal;
          newDoc.weekDateDB = doc.data().weekDateDB;
          if(calendarWeek){
            let newWeek = []
            calendarWeek.forEach(day => {
              // looks at each day of the week
              let newDay = {};
              for (let meal in day){
                // looks at meals of each day
                if(day[meal].mealName === this.state.mealName){
                  // if the meal is the target meal then
                  weekEdited = true;
                  newDay[meal] = { 
                    mealName: this.props.cleanName,
                    savedIngredients: this.props.passedProps.savedIngredients, 
                    mealMacros: state.mealMacros,
                  }
                  
                  
                } else {                  
                  newDay[meal] = day[meal];
                }  
              }
              newWeek.push(newDay);
            })
            newDoc.calendarWeek = newWeek;
          }
          
          if(weekEdited){
            let refDoc = weeks.doc(newDoc.weekDateDB);
            batch.update(refDoc, newDoc)

          }
        })

      })
      .catch(function(error) {
        console.log("Error getting week:", error);
      });
  
      //if there is a name change
      if(this.props.cleanName !== this.props.passedProps.mealName){
        batch.delete(targetMeal)

        batch.set(newMeal, {
          // mealName: this.props.cleanName.length > 0 ? this.props.cleanName : this.props.mealName,
          mealName: this.props.cleanName,
          savedIngredients: this.props.list,
          mealMacros: state.mealMacros,
        })
  
        console.log('name change - meal updated');
      }

      //if there is no name change
        batch.update(newMeal, {
          mealName: this.props.mealName,
          savedIngredients: this.props.list,
          mealMacros: state.mealMacros,
        })

        console.log('no name change - meal updated');

      

      //! I think this might be unnessary becuase of no name change
      //if a week is not edited, updates meal 
      // batch.update(newMeal, {
      //   mealName: this.props.cleanName,
      //   savedIngredients: this.props.list,
      //   mealMacros: state.mealMacros,
      // })

      batch.commit()
    }
    
    
  }
  
  loadFunc = () =>{
    //todo add code for db purposes
    
  }

  render() {
    
    return (
      
      <React.Fragment>

        <div className="mainContainer_ME">

          <ContentEditable
            html={this.props.mealName} 
            disabled={this.props.passedEditability? false : true} 
            onChange={this.props.handleUpdateName_ME} 
            className="editableName"
          />
          
          {this.state.shownIngredients.length > 0 ? 
            <PieChart 
            className="pieChart_UM"
            macros={this.state.mealMacros}
            height={120}
            labels={['protein', 'fat', 'carbs']}
            width={350}
            /> 
            : ""
          }        

          <div className="listContainer_ME">
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadFunc}
                hasMore={false}
            >
                {this.state.shownIngredients}
            </InfiniteScroll>
          </div>

          {this.props.passedEditability === false 
            ?
            <div className="editButtonBar_ME">
              <button 
              className="editButton_ME"
                  onClick={ 
                    () => {
                      this.props.handleEditablility();
                    }
                  } 
                >Edit
              </button> 
            </div>
            
            :
            <div className="searchSaveBar_ME">

              <NavLink 
              to={{
                pathname: "/search",
                lastURL: this.props.history.location.pathname,
                passedProps: this.props.passedProps
              }}
              className="addIngreButton_ME"
              >
                Add Ingredient
              </NavLink>

              <button 
                onClick={ 
                  () => { 
                    if (this.state.mealName.length > 0) {
                      // this.props.handleSaving();
                      this.sendToDatabase() 
                    }
                  } 
                } 
                type="submit" 
                className="saveButton_ME"
                >{!this.props.loading ? "Save Meal" : "Saving ..."}
               </button>

            </div>
          }  
          </div>

      </React.Fragment>

    )

  }
}

export default MealEditor;