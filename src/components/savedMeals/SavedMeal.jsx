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