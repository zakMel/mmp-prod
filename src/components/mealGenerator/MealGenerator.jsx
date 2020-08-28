import React from "react"
import {firestore} from '../../configFirebase';
import Ingredient from './Ingredient'
import PieChart from './PieChart'
import dbServices from '../../services/dbServices'
import { NavLink } from "react-router-dom";
import "../../style/mealGenerator.css";

class MealGenerator extends React.Component {
  constructor (props) {
      super(props);

      this.state={
        mealName: '',
        shownIngredients: [],
        savedIngredients: [],
        mealMacros: {
          protein: 0,
          fat: 0,
          carbs: 0
        },
      }
  }

  sendToDatabase = () => {
    const db = firestore;
    let meals = db.collection("meals");
    let document = meals.doc(`${this.state.mealName}`);
    let state = this.state;

    dbServices.doc(`${document}`).set(state)

    // dbServices.set(document, {
    //   mealName: state.mealName,
    //   shownIngredients: state.shownIngredients,
    //   savedIngredients: state.savedIngredients,
    //   mealMacros: state.mealMacros,
    // })
  }

  componentDidMount(){

    this.setState(() => {
      let mappedList  = this.props.list.map(ingre => this.renderIngredients(ingre));
      let givenIngredients = this.props.list.map(item => item.ingre);

        return {
          shownIngredients : mappedList,
          savedIngredients : givenIngredients,
        }
    })

  }
  
  handleNameInput = (e) => {
    const target = e.target;
    const value = target.value;

    this.setState({
      mealName: value
    });
  }

  renderIngredients = (ingredient) => {
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
    
    //! ingredient.ingre required with this render
    return (
      <Ingredient
        key={ingredient.ingre.fdcId}
        ingredient={ingredient.ingre}
        description={ingredient.ingre.description}
        nutrients={ingredient.ingre.foodNutrients} 
      />
      
    );

  };

  addIngredient = (ingredient) => {
    this.setState((state)=>{
      let addedIngredient = state.ingredients;
      addedIngredient.push(ingredient)
      
      return {
        ingredients : addedIngredient
      }

    })
  }
  
  render() {

      return (

        <React.Fragment>

          <div className="mealContainer">

            <div className="mealName">
              <input onChange={ this.handleNameInput } placeholder="Input Meal Name" type="text" className="text-center form-control searchInput border-primary"></input>
            </div>
            
            <div className="chartSearchBar">

              <PieChart 
                macros={this.state.mealMacros}
              />

              <NavLink 
              to="/search"
              className="nav-link searchGlass"
              >
                <svg className="eyeGlass" stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="12vh" width="12vw">
                  <g fill="#616161">
                    <rect x="34.6" y="28.1" transform="matrix(.707 -.707 .707 .707 -15.154 36.586)" width="4" height="17"></rect>
                    <circle cx="20" cy="20" r="16"></circle>
                  </g>
                  <rect x="36.2" y="32.1" transform="matrix(.707 -.707 .707 .707 -15.839 38.239)" fill="#37474F" width="4" height="12.3"></rect>
                  <circle fill="#64B5F6" cx="20" cy="20" r="13"></circle><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
                </svg>
              </NavLink>
            
            </div>

            <div className="list">
              {this.state.shownIngredients}
            </div>


            <div className="submitMealButton">
                <button 
                  onClick={ 
                    () => { 
                      if (this.state.mealName.length > 0) {
                        this.sendToDatabase() 
                      }
                    } 
                  } 
                  type="submit" 
                  className="searchButton btn btn-primary"
                  >Save Meal
                </button>
            </div>   

          </div>                     

        </React.Fragment>

      )

  }
}

export default MealGenerator