import React from "react";
import firebase from "firebase";
import {firestore} from '../../configFirebase';
import InfiniteScroll from 'react-infinite-scroller';
import Meal from "./Meal";
import "../../style/savedMeals.css";


class SavedMeals extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            importedMeals: [],
            renderedMeals: []

        };
    }

    componentDidMount() {
        this.renderDOM();
    }
    
    renderSavedMeals = () => {
        this.setState((state)=>{
            let rendered = state.importedMeals.map(this.renderMeals)
    
            return{
                renderedMeals: rendered
            }
        })
    }

    renderDOM = () => {
        const db = firestore;
        let meals = db.collection("meals");
        let user = firebase.auth().currentUser.uid;
        let query = meals.where("userId", "==", user)
        
        query
        .get()
        .then(this.handleQuerySuccess)
        .then(this.renderSavedMeals)
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        
  
    }
    
    handleQuerySuccess = (response) => {
        let list = []
        response.forEach(doc => {
            list.push(doc.data());
        })

        this.setState(() => {
            return {
                importedMeals: list
            }
        })

    }

    renderMeals = (meal) => {
        
        return (
          <Meal
            meal={meal}
            description={meal.mealName}
            // macros={meal.mealMacros}
            // ingredients={meal.savedIngredients}
          />
          
        );
          
      };

    loadFunc = () => {

    }

    render () {

        return (
            <div className="savedContainer">

                <div className="mealListContainer">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFunc}
                    hasMore={false}
                    // threshold={280}
                    // loader={<div className="loader" key={0}>Loading ...</div>}
                    // useWindow={true}
                >
                    {this.state.renderedMeals}
                </InfiniteScroll>
                </div>

            </div>

        )

    }
}

export default SavedMeals