import React from 'react'
import "../../style/mealGenerator.css"

export default function Ingredient (props) {

    return (
        
        <div>
            {props.passedEditability === false
                ? 
                <div className="ingredient_ME">
                
                    <div 
                    className="ingredientText_MG"
                    >
                        {/* { props.description.length > 60 && window.screen.width < 668?
                            `${props.description.slice(0, 60)}...` : props.description
                        }  */}
                        {props.description}
                    </div>  
        
                </div>
                
                :
                <div className="ingreEditBar_ME">
                        <input 
                            onFocus={ (e) => props.enterIngreInput(e, props.macros) }
                            onBlur={ (e) => props.exitIngreInput(e, props.macros) } 
                            placeholder="grams" 
                            type="text" 
                            className="IngreEditGrams_ME"
                        >
                        </input>
                        <div 
                        className="prevIngreDescription"
                        >
                            { props.description.length > 45 && window.screen.width < 668?
                                `${props.description.slice(0, 45)}...` : props.description
                            } 
                        </div>  
                        <button 
                            // type="submit" 
                            onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                            className="ingreDeleteBtn_ME"
                            >Delete
                        </button>
                 </div>
            }
        </div>
    )

}