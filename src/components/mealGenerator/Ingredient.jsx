import React from 'react'
import "../../style/mealGenerator.css"

export default function Ingredient (props) {

    return (

        <div className="listItemContainer">
            <div 
            className="listDescription border border-dark bg-light text-body list-group-item list-group-item-action"
            >
                 { props.description.length > 85 ?
                    `${props.description.slice(0,85)}...` : props.description
                 } 
            </div>  
            <input onChange={props.addingGrams} placeholder="# grams" type="text" className="gramInput text-center border-primary"></input>
            <button type="submit" className="text-center deleteButton btn btn-danger">Delete</button>
        </div>

    )

}