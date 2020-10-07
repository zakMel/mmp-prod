import React from 'react';
import Item from './item';
import "../../style/shoppingList.css";

export default function ShoppingList (props) {
    return (
        <React.Fragment>

            <div className="shoppingListContainer">
                <h2 className="title_SL" >shoppingList</h2>     
                <Item 
                    checkedSl={props.checkedSl}
                    handlingChecked={props.handlingChecked}
                />
            </div>
        </React.Fragment>

    )

};