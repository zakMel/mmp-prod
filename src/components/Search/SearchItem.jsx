import React from 'react'
import { NavLink } from "react-router-dom";

export default function SearchItem (props) {
    console.log(props.passedProps)
    return (

        <NavLink 
        className="ingredient"
        to={{
            pathname: props.lastURL === "/mealEditor"? "/mealEditor" : "/mealGenerator",
            passedProps: props.passedProps
        }}
        onClick={() => { props.addIngredient(props.ingredient) }}
        >
            <p className="ingredientText">
                { props.description.length > 140 ?
                `${props.description.slice(0, 140)}...` : props.description
                } 
            </p>

        </NavLink>

    )

}