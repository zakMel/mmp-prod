import React, { useState, useEffect } from 'react';


export default function Item (props) {
    
    let [checkStatus, checkingBox] = useState(false)

    let description = "placeholder";

    // useEffect(() => {
    //     if (props.checkedSl.includes(description)){
    //         console.log(props.checkedSl.includes(description))
    //         checkingBox(true);
    //     } else {
    //         checkingBox(false)
    //     }

    // });
    
    return (
        <div className="itemContainer_SL">
            <input type="checkbox" className="itemCheck_SL" 
            // onChange={(e)=>{props.handlingChecked(e)}}
            // checked={ checkStatus }
            />
            <p className="itemDescr_SL">{props.desc}</p>
        </div>
    )
}