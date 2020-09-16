import React from 'react'
import "../../style/mealGenerator.css"

export default function Ingredient (props) {
    console.log(window.screen.width)

    return (

        <div className="itemContainer">
            <input onBlur={ (e) => props.updateMacros(e, props.macros) } placeholder="grams" type="text" className="itemGrams"></input>
            <div 
            className="itemDescription "
            >
                 { props.description.length > 45 && window.screen.width < 668?
                    `${props.description.slice(0, 45)}...` : props.description
                 } 
            </div>  
            <button type="submit" className="itemDeleteButton btn btn-danger">Delete</button>
        </div>

    )

}