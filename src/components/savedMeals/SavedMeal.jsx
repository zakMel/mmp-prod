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
                    passedMeal: this.props.passedMeal 
                }}
                onClick={()=>{
                    this.props.updateList(this.props.passedMeal.savedIngredients);
                    this.props.handleSetName_ME(this.props.passedMeal.mealName);
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