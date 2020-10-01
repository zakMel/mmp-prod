import React from "react";
import firebase from "firebase";
import {firestore} from '../../configFirebase';
import InfiniteScroll from 'react-infinite-scroller';
import SavedMeal from "./SavedMeal";
import "../../style/savedMeals.css";
const db = firestore;

class MealViewer extends React.Component {

        state = {
            importedMeals: [],
            renderedMeals: []

        };
    

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
        let user = firebase.auth().currentUser;
        const users = db.collection("users");
        let userFile = users.doc(`${user.uid}`);
        let meals = userFile.collection("meals");
        // let query = meals.where("userId", "==", user)
        // console.log(query);
        // query
        meals.get()
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
          <SavedMeal
            passedProps={meal}
            description={meal.mealName}
            updateList={this.props.updateList}
            handleSetName_ME={this.props.handleSetName_ME}
            prevPath={this.props.history.location.prevPath === "/calendar"? this.props.history.location.prevPath : this.props.history.location.pathname}
            calendarUpdate={this.props.calendarUpdate}
            updateWeekItem={this.props.updateWeekItem}
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

export default MealViewer;