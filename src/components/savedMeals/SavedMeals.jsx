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
            meals: []

        };
    }

    componentDidMount() {
        this.getMeals();
        
        
    }
    
    getMeals = () => {
        const db = firestore;
        let meals = db.collection("meals");
        let user = firebase.auth().currentUser.uid;
        let query = meals.where("userId", "==", user)
        let list = [];
        
        query.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                list.push({mealName: doc.id, info: doc.data()})
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        
        // this.setState(()=>{
        //     return{
        //         meals: list
        //     }
        // })
        console.log(list)
    }
    
    renderMeals = (ingredient) => {
        
        return (
            <Meal
        //   ingredient={ingredient.ingre}
        //   description={ingredient.ingre.description}
        //   nutrients={ingredient.ingre.foodNutrients}
        //   addingGrams={this.addingGrams} 
        //   renderDOM={this.renderDOM}
        //   macros={ingredient.itemMacro}
        //   exitIngreInput={this.exitIngreInput}
        //   enterIngreInput={this.enterIngreInput}
        //   handleDeleteFromDOM={this.handleDeleteFromDOM}
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
                  {this.state.meals}
              </InfiniteScroll>
            </div>

                {<Meal />}

            </div>

        )

    }
}

export default SavedMeals