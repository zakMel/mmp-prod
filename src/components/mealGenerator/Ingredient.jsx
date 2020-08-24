import React from 'react'
import { NavLink } from "react-router-dom";

export default function Ingredient (props) {

    return (

        <div className="list-group">
            <NavLink 
            to="/meal"
            onClick={ props.addIngredient(props.ingredient) }
            className="border border-dark bg-light text-body list-group-item list-group-item-action"
            >
                 { props.description.length > 95 ?
                    `${props.description.slice(0,90)}...` : props.description
                 } 

            </NavLink>  
        </div>

    )

}