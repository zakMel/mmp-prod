import React from 'react'
import { NavLink } from "react-router-dom";

export default function SearchItem (props) {
    console.log(props)

    return (

        <div className="ingredient">
            <NavLink 
            to="/meal"
            onClick={() => { props.addIngredient(props.ingredient) }}
            className="ingredientText"
            >
                 { props.description.length > 140 ?
                    `${props.description.slice(0, 140)}...` : props.description
                 } 

            </NavLink>  
        </div>

    )

}