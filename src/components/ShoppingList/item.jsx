import React, { useState, useEffect } from 'react';


export default function Item (props) {
    
    const [checkStatus, checkingBox] = useState(false)
    let description = "placeholder";

    useEffect(() => {
        if (props.checkedSl.includes(description)){
            checkingBox(true);
        } else {
            checkingBox(false)
        }
    }, [props.checkedSl, description]);
    
    return (
        <div className="itemContainer_SL">
            <input type="checkbox" className="itemCheck_SL" 
            onClick={(e)=>{props.handlingChecked(e)}}
            checked={ checkStatus }
            >
            </input>
    <p className="itemDescr_SL">{description}</p>
        </div>
    )
}