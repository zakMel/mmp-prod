import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import PieChart from "../PieChart";
import '../../style/savedMeals.css';

class SavedMeal extends Component {
    state = {};

    componentDidMount() {
        console.log(this.props.nameLength)

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
                            {(this.props.description.length < 80 ? this.props.description : `${this.props.description.slice(0, 80)}...`)}
                        </p>
                    </NavLink>

                    <button
                    className="viewerDeleteButton"
                    onClick={(e)=>this.props.handleDeleteFromDOM(e)}
                    >
                    DELETE

                    </button>

                </div>
            </React.Fragment>
               
    
        );


    }


}

export default SavedMeal;