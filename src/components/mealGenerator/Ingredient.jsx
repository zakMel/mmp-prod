import React from 'react'
import "../../style/mealGenerator.css"

export default function Ingredient (props) {

    return (

        <div className="itemContainer">
            <input onChange={props.addingGrams} placeholder="grams" type="text" className="itemGrams"></input>
            <div 
            className="itemDescription "
            >
                 { props.description.length > 45 ?
                    `${props.description.slice(0, 45)}...` : props.description
                 } 
            </div>  
            <button type="submit" className="itemDeleteButton btn btn-danger">Delete</button>
        </div>

    )

}