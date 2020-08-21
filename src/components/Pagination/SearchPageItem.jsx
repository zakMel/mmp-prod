import React from 'react';

export default function SearchItem (props) {

    return (
      <li className="page-item pl-1">
        <button onClick={props.handlePagination} className="btn btn-outline-dark">
          {props.listItem}
        </button>
      </li>
    )  

}










