import React from 'react'
import { NavLink } from "react-router-dom";

export default function SearchItem (props) {

    return (

        <NavLink 
        className="ingredient"
        to="/mealGenerator"
        onClick={() => { props.addIngredient(props.ingredient) }}
        macros={props.macros}
        >
            <p className="ingredientText">
                { props.description.length > 140 ?
                `${props.description.slice(0, 140)}...` : props.description
                } 
            </p>

        </NavLink>

    )

}