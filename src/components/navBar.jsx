import React from 'react';

export default function navBar (props) {
    return (

        <ul className="nav nav-pills justify-content-center fixed-bottom bg-light">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Active
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link disabled"
              href="#"
              tabIndex={-1}
              aria-disabled="true"
            >
              Disabled
            </a>
          </li>
        </ul>        

    )

}