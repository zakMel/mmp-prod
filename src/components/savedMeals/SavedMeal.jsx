import React, {Component} from 'react';
import firebase from "firebase";
import {firestore} from '../../configFirebase';
import $ from 'jquery'
import { NavLink } from 'react-router-dom'
import PieChart from "../PieChart";
import '../../style/savedMeals.css';
const db = firestore;

class SavedMeal extends Component {
    state = {};

    componentDidMount() {
        // console.log(this.props.nameLength)

    }

    handleBatching = async e => {
        let user = firebase.auth().currentUser;
        const userFile = db.collection("users").doc(`${user.uid}`);
        let meals = userFile.collection("meals");
        let weeks = userFile.collection("weeks");
        let targetMeal = meals.doc(`${this.props.passedProps.mealName}`);
        let container = e.target.parentElement;
        let description = $(container).children().filter(".savedMeal").text();    
      
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
    
            //   if(calendarWeek){
                let newWeek = []
                calendarWeek.forEach(day => {
                  // looks at each day of the week
                  let newDay = {};
                  for (let meal in day){
                    // looks at meals of each day
                    if(day[meal].mealName === description){
                      // if the meal is the target meal then
                      edited = true;
                      newDay[meal] = meal;
                       
    
                    } else {                  
                      newDay[meal] = day[meal];
                    }  
                  }
                  newWeek.push(newDay);
    
                })
                newDoc.calendarWeek = newWeek;
            //   }
              
              
              if(edited){
                let refDoc = weeks.doc(newDoc.weekDateDB);
                batch.update(refDoc, newDoc)
                console.log(newDoc)
    
              }
            })
    
          })

        batch.delete(targetMeal)
    
    
        batch.commit()
        
    
    }

  
    render() {
        return (
            <React.Fragment>
                <div className="viewListItem">
                    <PieChart 
                        macros={this.props.mealMacros ? this.props.mealMacros : {} }
                        height={50}
                        width={50}
                        layout={{
                            padding: {
                                bottom: 8,
                            }
                        }}
                    />

                    <NavLink 
                    to={{
                        pathname: this.props.prevPath === "/calendar" ? "/calendar" : "/mealEditor",
                        passedProps: this.props.passedProps 
                    }}
                    onClick={()=>{
                        if(this.props.prevPath === "/mealViewer") {
                            this.props.updateList(this.props.passedProps.savedIngredients)
                            this.props.handleSetName_ME(this.props.passedProps.mealName)
                        } else  {
                            this.props.updateList(this.props.updateWeekItem(this.props.calendarUpdate.day, this.props.calendarUpdate.meal, this.props.passedProps))
                        }
                        
                        this.props.handleEditablility(false);
                    }}
                    className="savedMeal"
                    >
                        <p className={this.props.nameLength < 35 ? "ingredientText_short" : "ingredientText_long"} >
                            {/* {(this.props.description.length < 80 ? this.props.description : `${this.props.description.slice(0, 80)}...`)} */}
                            {this.props.description}
                        </p>
                    </NavLink>

                    <button
                    className="viewerDeleteButton"
                    onClick={(e)=> {
                        this.props.handleDeleteFromDOM(e)
                        this.handleBatching(e)
                    }}
                    >
                    DELETE

                    </button>

                </div>
            </React.Fragment>
               
    
        );


    }


}

export default SavedMeal;