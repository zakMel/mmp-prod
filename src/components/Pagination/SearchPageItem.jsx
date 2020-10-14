import React from 'react';

export default function SearchItem (props) {

    return (
      
        <button onClick={props.handlePagination} className="tab">
          {props.listItem}
        </button>
    )  

}










