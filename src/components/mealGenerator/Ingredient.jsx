import React from 'react'

export default function Ingredient (props) {

    return (

        <div className="list-group">
            <div 
            className="border border-dark bg-light text-body list-group-item list-group-item-action"
            >
                 { props.description.length > 95 ?
                    `${props.description.slice(0,90)}...` : props.description
                 } 

            </div>  
        </div>

    )

}