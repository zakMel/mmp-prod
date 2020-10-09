import React from 'react';


export default function Item (props) {
    
    return (
        <div className="itemContainer_SL">
            <input 
            type="checkbox" 
            className="itemCheck_SL"
            id="checkbox"
            />
            <p 
            className="itemDescr_SL"
            >
                {props.desc[0].length < 40 ? `(x${props.desc[1]}) - ${props.desc[0]}` : `(x${props.desc[1]}) - ${props.desc[0].slice(0, 40)}...`}</p>
        </div>
    )
}