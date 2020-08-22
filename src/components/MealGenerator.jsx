import React from "react"
import { NavLink } from "react-router-dom";
import "../style/meal.css";

class Search extends React.Component {
    constructor (props) {
        super(props);

        this.state={
            imput:[],
        }
    }

     changeBackground = (e) => {
      if(e.target.style.background === 'white') {
        e.target.style.background = 'grey';
      } 
    }
  
     changeBackgrounds = (e) => {
      if(e.target.style.background === 'blue') {
        e.target.style.background = 'white';
      }
    }

    render() {

        return (

          <NavLink 
          to="/search"
          className="nav-link searchLink"
          >
            <svg className="mt-5 h1" stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em">
              <g fill="#616161">
                <rect x="34.6" y="28.1" transform="matrix(.707 -.707 .707 .707 -15.154 36.586)" width="4" height="17"></rect>
                <circle cx="20" cy="20" r="16"></circle>
              </g>
              <rect x="36.2" y="32.1" transform="matrix(.707 -.707 .707 .707 -15.839 38.239)" fill="#37474F" width="4" height="12.3"></rect>
              <circle fill="#64B5F6" cx="20" cy="20" r="13"></circle><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
            </svg>
          </NavLink>
        
        )

    }
}

export default Search;