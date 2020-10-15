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
              : <h5 className="instructions">To start search an ingredient!</h5>
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
                {/* <svg className="magnifyingGlass" stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="12vh" width="12vw">
                  <g fill="#616161">
                    <rect x="34.6" y="28.1" transform="matrix(.707 -.707 .707 .707 -15.154 36.586)" width="4" height="17"></rect>
                    <circle cx="20" cy="20" r="16"></circle>
                  </g>
                  <rect x="36.2" y="32.1" transform="matrix(.707 -.707 .707 .707 -15.839 38.239)" fill="#37474F" width="4" height="12.3"></rect>
                  <circle fill="#64B5F6" cx="20" cy="20" r="13"></circle><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
                </svg> */}
              Add Ingredient
              </NavLink>    
  
              <div className="listContainer">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFunc}
                    hasMore={false}
                    // threshold={280}
                    // loader={<div className="loader" key={0}>Loading ...</div>}
                    // useWindow={true}
                >
                    {this.props.shownIngredients}
                </InfiniteScroll>
              </div>
              
              <div className="saveButtonContainer_MG">
                <div className="saveButtonBar_MG">
               
                <input value={this.props.mealName} onChange={ this.props.handleNameInput_MG } placeholder="Input Meal Name" type="text" className="mealNameInput_MG"></input>
                  <NavLink 
                    to="/mealViewer"
                    onClick={ 
                      () => { 
                        if (this.props.mealName.length > 0) {
                          this.props.handleSaving();
                          this.props.sendToDatabase() 
                          console.log("sent")
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