import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class SavedMeal extends Component {
    state = {};

    componentDidMount() {

    }

    render() {
        return (
    
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
                        this.props.updateList(this.props.updateCalendarMeal(this.props.calendarUpdate.day, this.props.calendarUpdate.meal, this.props.passedProps))
                    }
                }}
                className="savedMeal"
                >
                    <p className="ingredientText">
                        { this.props.description} 
                    </p>
    
                </NavLink>
    
               
    
        );


    }


}

export default SavedMeal;