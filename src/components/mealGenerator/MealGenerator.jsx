import React from "react";
import firebase from 'firebase';
import {firestore} from '../../configFirebase';
import { Route, withRouter } from "react-router-dom";
import $ from "jquery"
import MgBody from "./MG_Body"
import Search from '../Search/Search'
import dbServices from '../../services/dbServices';
import Ingredient from './Ingredient';
import "../../style/mealGenerator.css";
import "../../App.css";
const db = firestore;

class MealGenerator extends React.Component {
    
    state = {
      mealName: this.props.mealName,
      shownIngredients: [],
      savedIngredients: [],
      mealMacros: {
        protein: 0,
        fat: 0,
        carbs: 0
      },
    }
  
  
  componentDidMount(){
    let component = this;

    (async function mounting (component) {

      await component.props.clearIngredients();
      await component.checkUserFile();
      component.renderDOM();
  
      if(component.props.mealName.length > 0){
        $('.mealName.input').text(component.props.mealName);
      }
    })(component);

  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.mealName !== prevProps.mealName){
      this.setState({mealName: this.props.mealName});
    }

  }

  checkUserFile = async () => {
    let user = firebase.auth().currentUser;
    const users = db.collection("users");
    let userFile = users.doc(`${user.uid}`);
    let checking = await userFile.get();

    if(!checking.exists) {
      userFile.set({
      email: user.email
      })
    }

  }
  
  renderDOM = () => {
    let mappedList = this.props.list.map(ingre => this.renderIngredients(ingre));
    let givenIngredients = this.props.list;
    
    this.setState(() => {
      
      return {
        shownIngredients : mappedList,
        savedIngredients : givenIngredients,
      }
    })
    
  }

  renderIngredients = (ingredient) => {
    
    this.addMacros(ingredient)
    
    return (
      <Ingredient
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

  sendToDatabase = () => {
    let user = firebase.auth().currentUser;
    const users = db.collection("users");
    let userFile = users.doc(`${user.uid}`);

    let meals = userFile.collection("meals");
    let document = meals.doc(`${this.state.mealName}`);
    let state = this.state;

    dbServices.set(document, {
      mealName: state.mealName,
      savedIngredients: state.savedIngredients,
      mealMacros: state.mealMacros,
    })
  } 

  enterIngreInput = (e, macros) => {
    //   let container = e.target.parentElement;
    //   let description = container.childNodes[0].innerHTML;
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
    let description = $(container).children().filter(".itemDescription").html();

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
        let includes = current.props.description.includes(description.slice(0, (description.length - 3)));
      
        if(!includes){
          newRender.push(current)
        }  

      }

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
      let includes = ingredent.description.includes(description.slice(0, (description.length - 3)));

      if(!includes){
        newList.push(current);
      }
    }

    this.props.updateList(newList);

  }
  
  loadFunc = () =>{
    //todo add code for db purposes
    
  }
    
  render() {
    
    return (
      
      <React.Fragment>

        {/* <div className="mealGeneratorContainer"> */}

          { this.props.searching === false 
          ?
          <div className="mealGeneratorContainer">
            <MgBody 
              shownIngredients={this.state.shownIngredients}
              handleSearching={this.props.handleSearching}
              renderDOM={this.renderDOM}
              mealMacros={this.state.mealMacros}
              mealName={this.props.mealName}
              handleNameInput_MG={this.props.handleNameInput_MG}
              sendToDatabase={this.sendToDatabase}
            />
          </div>
          :
          <div className="mealGeneratorContainer">
            <Route
              path="/mealGenerator/search"
              exact={true}
              render={(props) => (
                <Search 
                addIngredient={this.props.addIngredient}
                handleUpdatePage={this.props.handleUpdatePage}
                currentTabs={this.props.currentTabs}
                history={this.props.history}
                handleSearching={this.props.handleSearching}
                resetCurrentTabs={this.props.resetCurrentTabs}
                />
              )}
            />
            
          </div>
          }
          

        {/* </div>                      */}

      </React.Fragment>

    )

  }
}

export default withRouter(MealGenerator);
