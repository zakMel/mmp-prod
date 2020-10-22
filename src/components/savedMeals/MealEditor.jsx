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
    editable: false
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
    let grams = $(container).children().filter(".itemGrams")[0].value;
    let desRef = $(container).children().filter("div.editItemDescription")[0].innerText;
    let description = desRef.slice(0, desRef.length-3);

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

    //removes from the dom
    let newRender = [];

    for ( let u = 0; u < this.state.shownIngredients.length;  u++) {
      let arr = this.state.shownIngredients;
      let current = arr[u];
      let includes = current.props.description.includes(description);
    
      if(!includes){
        newRender.push(current)
      }  

    }

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
      let includes = ingredent.description.includes(description);

      if(!includes){
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
            mealName: this.props.mealName,
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
    let newMeal = meals.doc(`${this.props.mealName}`);
    let targetMeal = meals.doc(`${this.props.passedProps.mealName}`);
    let state = this.state;

    if(exists){
      var batch = db.batch()
      let newDoc = {};
      let edited = false;
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
                  edited = true;
                  newDay[meal] = { //! here is the last error
                    mealName: this.props.mealName,
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
          
          if(edited){
            let refDoc = weeks.doc(newDoc.weekDateDB);
            batch.update(refDoc, newDoc)

          }
        })

      })
      //if there is a name change
      if(exists && this.props.mealName !== this.props.passedProps.mealName){
        batch.delete(targetMeal)

        batch.set(newMeal, {
          mealName: this.props.mealName,
          savedIngredients: this.props.passedProps.savedIngredients,
          mealMacros: state.mealMacros,
        })
  

      }
      //if there is no name change
      if(exists && this.props.mealName === this.props.passedProps.mealName){
        batch.update(newMeal, {
          mealName: this.props.mealName,
          savedIngredients: this.props.passedProps.savedIngredients, 
          mealMacros: state.mealMacros,
        })

      }

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
            // innerRef={this.contentEditable}
            html={this.props.mealName} // innerHTML of the editable div
            disabled={this.props.passedEditability? false : true}       // use true to disable editing
            onChange={this.props.handleUpdateName_ME} 
            className="editableName"
            // tagName='article' // Use a custom HTML tag (uses a div by default)
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
                // className="list_ME"
                pageStart={0}
                loadMore={this.loadFunc}
                hasMore={false}
                // threshold={280}
                // loader={<div className="loader" key={0}>Loading ...</div>}
                // useWindow={true}
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
                      this.props.handleSaving();
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