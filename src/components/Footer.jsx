import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export default function Footer (props) {

    return (
        <Nav className="justify-content-end fixed-bottom bg-light" >
            <Nav.Item>
                <NavLink 
                    to="/home"
                    className="mr-3 mb-2 mt-2 text-dark btn btn-outline-dark"
                >
                    Log Out
                </NavLink>
            </Nav.Item>
        </Nav>
      
    )

}
















 
  
