import React, {useState} from 'react';
import firebase from 'firebase';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import "../App.css";

export default function UserBar (props) {
    let auth = firebase.auth()
    let user = auth.currentUser;

    let [navState, setExpand] = useState(false);

    let logout = () => {
        if(user){
            auth.signOut();

        } else {
            
        }
    }

    return (

        <Navbar expanded={navState} expand="true" variant="dark" className="navBar" >
            {/* <Navbar.Brand href="/">Macro Meal Planning</Navbar.Brand> */}
            <NavLink 
                to="/"
                className="nav-home"
            >
            Macro Meal Planning    
            </NavLink>
            <Navbar.Toggle 
            onClick={() => setExpand(!navState)}
            aria-controls="responsive-navbar-nav" 
            />
            <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="mr-auto" >
                    <NavLink 
                        to="/mealGenerator"
                        className="nav-link"
                        onClick={() => {
                            props.clearIngredients();
                            setExpand(!navState);
                            props.handleSearching(false);
                            props.resetCurrentTabs();
                        }}
                    >
                            <svg className="mr-3 mb-1" stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M282.344 15.5C205.347 26.1 179.64 117.517 196.47 178.188c21.46 77.357-72.35 84.35-51.876-38.5-27.153 44.283-34.75 83.65-29.28 116.843.016.096.043.188.06.283 6.086 32.673 23.263 58.04 46.595 76.562 14.994 11.903 32.572 20.854 51.25 26.688-59.82-145.108 153.65-144.51 89.593 3.875 20.82-4.818 39.963-13.81 55.312-27 20.46-17.582 34.67-42.43 37.688-76.313 1.43-24.45-2.34-53.204-12.875-86.563-26.74 103.853-85.32 79.05-31.344-53.03-95.86 83.26-108.066-17.42-69.25-105.532zm130.53 258.063c-1.06 6.353-2.47 12.473-4.25 18.312 14.737 5.447 26.477 11.677 34.376 17.938 9.02 7.148 12.5 13.61 12.5 19.28 0 5.673-3.48 12.164-12.5 19.313-9.02 7.15-23.072 14.23-40.844 20.188-35.544 11.915-85.786 19.53-141.25 19.53s-105.674-7.615-141.22-19.53c-17.77-5.958-31.822-13.04-40.842-20.188-9.02-7.15-12.5-13.64-12.5-19.312 0-5.672 3.48-12.133 12.5-19.28 6.886-5.46 16.706-10.874 28.875-15.783-2.562-5.59-4.816-11.407-6.69-17.467-13.486 5.386-24.878 11.545-33.81 18.625-10.75 8.52-18.33 18.99-19.407 30.968h-.157v9.344c0 44.85 24.787 85.116 63.47 113.625 38.68 28.51 91.436 45.78 149.5 45.78 58.062 0 110.817-17.27 149.5-45.78 38.68-28.51 63.468-68.774 63.468-113.625h-.063c.416-2.088.658-4.224.658-6.406 0-13.205-7.945-24.7-19.563-33.906-10.634-8.43-24.763-15.56-41.75-21.625z"></path>
                            </svg>
                            Meal Generator
                    </NavLink>
                    <NavLink 
                        to="/calendar"
                        className="nav-link"
                        onClick={() => setExpand(!navState)}
                    >
                            <svg className="mr-3 mb-1" stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1em" width="1em">
                                <path fill="#CFD8DC" d="M5,38V14h38v24c0,2.2-1.8,4-4,4H9C6.8,42,5,40.2,5,38z"></path>
                                <path fill="#F44336" d="M43,10v6H5v-6c0-2.2,1.8-4,4-4h30C41.2,6,43,7.8,43,10z"></path>
                                <g fill="#B71C1C">
                                <circle cx="33" cy="10" r="3"></circle>
                                <circle cx="15" cy="10" r="3"></circle>
                                </g>
                                <g fill="#B0BEC5">
                                <path d="M33,3c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2s2-0.9,2-2V5C35,3.9,34.1,3,33,3z"></path>
                                <path d="M15,3c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2s2-0.9,2-2V5C17,3.9,16.1,3,15,3z"></path>
                                </g>
                                <g fill="#90A4AE">
                                <rect x="13" y="20" width="4" height="4"></rect>
                                <rect x="19" y="20" width="4" height="4"></rect>
                                <rect x="25" y="20" width="4" height="4"></rect>
                                <rect x="31" y="20" width="4" height="4"></rect>
                                <rect x="13" y="26" width="4" height="4"></rect>
                                <rect x="19" y="26" width="4" height="4"></rect>
                                <rect x="25" y="26" width="4" height="4"></rect>
                                <rect x="31" y="26" width="4" height="4"></rect>
                                <rect x="13" y="32" width="4" height="4"></rect>
                                <rect x="19" y="32" width="4" height="4"></rect>
                                <rect x="25" y="32" width="4" height="4"></rect>
                                <rect x="31" y="32" width="4" height="4"></rect>
                                </g>
                            </svg>
                            Calendar
                    </NavLink>
                    <NavLink 
                        to="/mealViewer"
                        className="nav-link"
                        onClick={() => setExpand(!navState)}
                    >
                            <svg className="mr-3 mb-1" stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1em" width="1em">
                                <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"></path>
                                <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>
                            </svg>
                            Saved Meals
                    </NavLink>
                    <NavLink 
                        to="/shoppingList"
                        className="nav-link"
                        onClick={() => setExpand(!navState)}
                    >
                            <svg className="mr-3 mb-1" stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
                            </svg>
                            Shopping List
                    </NavLink>
                    <NavLink 
                        to="/"
                        className="nav-link"
                        onClick={() => {
                            setExpand(!navState);
                            logout();
                        }}
                    >
                            <svg className="mr-3 mb-1" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Logout
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}



