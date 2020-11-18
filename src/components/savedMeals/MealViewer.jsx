import React from "react";
import firebase from "firebase";
import {firestore} from '../../configFirebase';
import $ from 'jquery'
import InfiniteScroll from 'react-infinite-scroller';
import SavedMeal from "./SavedMeal";
import "../../style/savedMeals.css";
const db = firestore;
let key = 10000000;

class MealViewer extends React.Component {

        state = {
            importedMeals: [],
            renderedMeals: []

        };
    

    componentDidMount() {
        this.renderDOM();
    }

    componentDidUpdate () {
        
    }

    renderDOM = () => {
        let user = firebase.auth().currentUser;
        const users = db.collection("users");
        let userFile = users.doc(`${user.uid}`);
        let meals = userFile.collection("meals");

        meals.get()
        .then(this.handleQuerySuccess)
        .then(this.renderSavedMeals)
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        
  
    }
    
    handleQuerySuccess = async (response) => {
        let list = []
        await response.forEach(doc => {
            list.push(doc.data());
        })

        await this.setState(() => {
            return {
                importedMeals: list
            }
        })

    }

    renderSavedMeals = () => {
        this.setState((state)=>{
            let rendered = state.importedMeals.map(this.renderMeals)
    
            return{
                renderedMeals: rendered
            }
        })
    }

    newKey = () => {
        key++
    }

    renderMeals = (meal) => {
        
        this.newKey()

        return (
          <SavedMeal
            key={key}
            passedProps={meal}
            description={meal.mealName}
            nameLength={meal.mealName.length}
            updateList={this.props.updateList}
            handleSetName_ME={this.props.handleSetName_ME}
            prevPath={this.props.history.location.prevPath === "/calendar"? this.props.history.location.prevPath : this.props.history.location.pathname}
            calendarUpdate={this.props.calendarUpdate}
            updateWeekItem={this.props.updateWeekItem}
            mealMacros={meal.mealMacros}
            handleDeleteFromDOM={this.handleDeleteFromDOM}
            handleEditablility={this.props.handleEditablility}
          />
          
        );
          
    };

    handleDeleteFromDOM = (e) => {
        let container = e.target.parentElement;
        let description = $(container).children().filter(".savedMeal").text();
    
        //removes from the dom
        this.setState( (state) => {
          let newRender = [];
    
          for ( let u = 0; u < state.renderedMeals.length;  u++) {
            let arr = state.renderedMeals;
            let current = arr[u];
            let equal = description === current.props.description
            if(!equal){
                newRender.push(current)
            }  
            
        }
        
        return {
            renderedMeals: newRender
        }
        
        })
  
    }

    loadFunc = () => {

    }

    render () {

        return (
            <div className="viewMainContainer">

                {this.state.importedMeals.length === 0 
                ? <div className="instructions">You must make a meal first!</div>
                : ""
                }

                <div className="viewListContainer">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFunc}
                    hasMore={false}
                >
                    {this.state.renderedMeals}
                </InfiniteScroll>
                </div>

            </div>

        )

    }
}

export default MealViewer;