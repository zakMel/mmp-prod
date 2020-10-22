import React from 'react'
import "../../style/mealGenerator.css"

export default function Ingredient (props) {

    return (

        <div className="itemContainer">
            <input 
                onFocus={ (e) => props.enterIngreInput(e, props.macros) }
                onBlur={ (e) => props.exitIngreInput(e, props.macros) } 
                placeholder="grams" 
                type="text" 
                className="itemGrams"
            >
            </input>
            <div 
            className="itemDescription"
            >
                 { props.description.length > 80 && window.screen.width < 668?
                    `${props.description.slice(0, 80)}...` : props.description
                 } 
            </div>  
            <button 
                onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                className="itemDeleteButton"
                >Delete
            </button>
        </div>

    )

}