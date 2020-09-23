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
                    pathname: "/mealEditor",
                    passedProps: this.props.passedProps 
                }}
                onClick={()=>{
                    this.props.updateList(this.props.passedProps.savedIngredients);
                    this.props.handleSetName_ME(this.props.passedProps.mealName);
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