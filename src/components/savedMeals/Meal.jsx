import React from "react";
import { NavLink } from "react-router-dom";

export default function Meal (props) {
    console.log(props)


    return (

            <NavLink 
            to="/mealGenerator"
            macros={props.macros}
            className="savedMeal"
            >
                <p className="ingredientText">
                    { props.description} 
                </p>

            </NavLink>
    );


}