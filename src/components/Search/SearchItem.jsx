import React from 'react'
import { NavLink } from "react-router-dom";

export default function SearchItem (props) {
    
    return (

        <NavLink 
        className="ingredient"
        to={{
            pathname: props.lastURL === "/mealEditor"? "/mealEditor" : "/mealGenerator",
            passedProps: props.passedProps
        }}
        onClick={() => { 
            props.addIngredient(props.ingredient) 
            props.resetCurrentTabs()
            if ( props.handleSearching ) {
               props.handleSearching(false)
            }}

        }
        >
            <p className="ingredientText">
                { props.description.length > 140 ?
                `${props.description.slice(0, 140)}...` : props.description
                } 
            </p>

        </NavLink>

    )

}