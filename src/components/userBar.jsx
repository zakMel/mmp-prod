import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
// className="fixed-bottom"

export default function userBar (props) {


    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Macro Meal Planning</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink 
                        to="/calendar"
                        className="nav-link"
                    >
                            <svg className="mr-3 mb-1" stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em">
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
                        to="/calendar"
                        className="nav-link"
                    >
                            <svg className="mr-3 mb-1" stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
                            </svg>
                            Shopping List
                    </NavLink>
                    <NavLink 
                        to="/calendar"
                        className="nav-link"
                    >
                            <svg className="mr-3 mb-1" stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em">
                                <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"></path>
                                <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>
                            </svg>
                            Saved Meals
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}





{/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
</NavDropdown> */}