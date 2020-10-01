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
    // let name = this.props.passedProps === undefined ? this.props.history.location.passedProps.mealName : this.props.passedProps.mealName;
    let name =this.props.mealName;
    let mappedList  = this.props.list.map(ingre => this.renderIngredients(ingre));
    let givenIngredients = this.props.list;
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
      editable={this.props.passedEditability}
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
    console.log(this.state.mealMacros)
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
    let description = $(container).children().filter("div.editItemDescription")[0].innerText;

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
    this.setState( (state) => {
      let newRender = [];

      for ( let u = 0; u < state.shownIngredients.length;  u++) {
        let arr = state.shownIngredients;
        let current = arr[u];
        let includes = current.props.description.includes(description);
      
        if(!includes){
          newRender.push(current)
        }  

      }

      console.log(newRender);

      return {
        shownIngredients: newRender
      }

    })

    //delete from App.jsx
    let newList = []
    for ( let i = 0; i < this.props.list.length; i++ ){
      let arr = this.props.list;
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
      let reMappedList  = this.props.list.map(ingre => this.renderIngredients(ingre));

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
    let weeks = userFile.collection("weeks");
    let document = meals.doc(`${this.props.mealName}`);
    let prevDoc = meals.doc(`${this.state.mealName}`);
    let state = this.state;

    prevDoc.get()
    .then(this.checkMealExistance)
    .then(this.handleBatching)
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

        // dbServices.set(document, {
          //   mealName: this.props.mealName,
          //   savedIngredients: state.savedIngredients,
          //   mealMacros: state.mealMacros,
          // })
        
      } else {
        return true;
      } 
  }

  handleBatching = (exists) => {
    let user = firebase.auth().currentUser;
    const userFile = db.collection("users").doc(`${user.uid}`);
    let meals = userFile.collection("meals");
    let weeks = userFile.collection("weeks");
    let newMeal = meals.doc(`${this.props.mealName}`);
    let targetMeal = meals.doc(`${this.state.mealName}`);
    let state = this.state;

    if(exists){
      // var batch = db.batch

      weeks.get()  
      .then((week) => {
        week.forEach(doc => {
          let calendarWeek = doc.data().calendarWeek
          console.log(Array.isArray(calendarWeek), calendarWeek)
          calendarWeek.forEach(day => {
            // console.log(day)
            for (let meal in day){
                // console.log(typeof meal)
              // console.log(Object.values(meal));
              // console.log(meal.mealName);
              if(typeof meal !== "string"){
                meal.forEach(data => {
                  console.log(data.mealName)
                })
              }
            }
          })
        })
      })

      // batch.set(newMeal, {
      //   mealName: this.props.mealName,
      //   savedIngredients: state.savedIngredients,
      //   mealMacros: state.mealMacros,
      // })
      // batch.delete(targetMeal)

      // batch.commit()
    }

    // if(this.props.mealName !== state.mealName){
    //   dbServices.delete(prevDoc)
    // }
  //}
  }
  


  loadFunc = () =>{
    //todo add code for db purposes
    
  }

  render() {
    
    return (
      
      <React.Fragment>

        <div className="updateMealContainer">

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
            /> 
            : ""
          }        

            <div className="updaterListContainer">
              <InfiniteScroll
                  // className="listContainer"
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

          {this.props.passedEditability
            ?<NavLink 
            to={{
              pathname: "/search",
              lastURL: this.props.history.location.pathname,
              passedProps: this.props.passedProps
            }}
            className="searchButton"
            >
              <svg className="magnifyingGlass" stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="12vh" width="12vw">
                <g fill="#616161">
                  <rect x="34.6" y="28.1" transform="matrix(.707 -.707 .707 .707 -15.154 36.586)" width="4" height="17"></rect>
                  <circle cx="20" cy="20" r="16"></circle>
                </g>
                <rect x="36.2" y="32.1" transform="matrix(.707 -.707 .707 .707 -15.839 38.239)" fill="#37474F" width="4" height="12.3"></rect>
                <circle fill="#64B5F6" cx="20" cy="20" r="13"></circle><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
              </svg>
            </NavLink>
            : ""
          }
          <div className="saveEditButton">
            {this.props.passedEditability
              ? <button 
                 onClick={ 
                  () => { 
                    if (this.state.mealName.length > 0) {
                      this.sendToDatabase() 
                    }
                  } 
                } 
                type="submit" 
                className="btn btn-primary"
                >Save Meal
               </button>
              : <button 
                  onClick={ 
                    () => {
                      this.props.handleEditablility();
                    }
                  } 
                type="submit" 
                className="btn btn-primary"
                >Edit
                </button> 
  }  
          </div>   

        </div>                     

      </React.Fragment>

    )

  }
}

export default MealEditor;