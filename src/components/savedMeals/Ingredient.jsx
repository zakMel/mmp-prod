import React from 'react'
import "../../style/mealGenerator.css"

export default function Ingredient (props) {
    console.log('screen width -->', window.screen.width)

    return (
        
        <div>
            {props.editable
                ? <div className="editItemContainer">
                        <input 
                            onFocus={ (e) => props.enterIngreInput(e, props.macros) }
                            onBlur={ (e) => props.exitIngreInput(e, props.macros) } 
                            placeholder="grams" 
                            type="text" 
                            className="itemGrams"
                        >
                        </input>
                        <div 
                        className="editItemDescription"
                        >
                            { props.description.length > 45 && window.screen.width < 668?
                                `${props.description.slice(0, 45)}...` : props.description
                            } 
                        </div>  
                        <button 
                            // type="submit" 
                            onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                            className="itemDeleteButton btn btn-danger"
                            >Delete
                        </button>
                 </div>
                  : <div className="fixedItemContainer">
                    
                        <div 
                        className="fixedItemDescription"
                        >
                            { props.description.length > 60 && window.screen.width < 668?
                                `${props.description.slice(0, 60)}...` : props.description
                            } 
                        </div>  
            
                    </div>
            }
        </div>
    )

}