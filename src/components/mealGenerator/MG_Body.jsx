import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { NavLink } from "react-router-dom";
import PieChart from '../PieChart';

class MG_Body extends React.Component {

    componentDidMount () {
        this.props.renderDOM()
    }

    loadFunc = () => {
    }

    render() {

        return (
            <React.Fragment>
  
              { this.props.shownIngredients.length > 0 
              ? <div className="instrPlaceholder"></div>
              : <div className="instructions">
                  <p className="firstParagraph">To start, search for an ingredient! All ingredients are given a default weight of one gram until later updated.</p> 
                  <p>Food should be weighed and grams entered the first time a meal is made in order to determine the meal's macro distribution.</p>
                </div>
              }
              
              {this.props.shownIngredients.length > 0 ? 
                <PieChart 
                className="pieChart_MG"
                macros={this.props.mealMacros}
                height={120}
                labels={['protein', 'fat', 'carbs']}
                width={350}
                /> 
                : ""
              }    

              <NavLink 
              to="/mealGenerator/search"
              className="searchButton_MG"
              onClick={ () => this.props.handleSearching() }
              >
              Add Ingredient
              </NavLink>    
  
              <div className="listContainer">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFunc}
                    hasMore={false}
                >
                    {this.props.shownIngredients}
                </InfiniteScroll>
              </div>
              
              <div className="saveButtonContainer_MG">
                <div className="saveButtonBar_MG">
               
                <input value={this.props.mealName} onChange={ this.props.handleNameInput_MG } placeholder="Input Meal Name" type="text" className="mealNameInput_MG"></input>
                  <NavLink 
                    to={this.props.mealName.length > 0 ? "/mealViewer" : "/mealGenerator"}
                    onClick={ 
                      () => { 
                        if (this.props.mealName.length > 0) {
                          this.props.handleSaving();
                          this.props.sendToDatabase() 
                        }
                      } 
                    } 
                    type="submit" 
                    className="saveButton_MG"
                    >
                    {!this.props.loading ? "Save Meal" : "Saving ..."}
                  </NavLink>

                </div>
              </div>

            </React.Fragment>  
        )
    }
}

export default MG_Body