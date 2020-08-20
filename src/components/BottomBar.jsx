import React from 'react';
// import { Button } from 'react-bootstrap';
// import { IconName } from "react-icons/fc";

export default function navBar (props) {

  function changeBackground(e) {
    if(e.target.style.background = 'white') {
      e.target.style.background = 'grey';
    } 
  }

  function changeBackgrounds(e) {
    if(e.target.style.background = 'blue') {
      e.target.style.background = 'white';
    }
  }


    return (

        <ul className="nav nav-pills justify-content-center fixed-bottom bg-light">
          <li className="nav-item">
            <a 
            className="nav-link icon h2"  
            href="#"  
            onMouseEnter={changeBackground}
            onMouseLeave={changeBackgrounds}
            >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em">
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
            </a>
          </li>
          <li className="nav-item">
            <a 
            className="nav-link icon h2" 
            href="#"
            onMouseEnter={changeBackground}
            onMouseLeave={changeBackgrounds}
            >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <a 
            className="nav-link icon h2" 
            href="#"
            onMouseEnter={changeBackground}
            onMouseLeave={changeBackgrounds}
            >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em">
                <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"></path>
                <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <a 
            className="nav-link icon h2" 
            href="#"
            onMouseEnter={changeBackground}
            onMouseLeave={changeBackgrounds}
            >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em">
                <g fill="#616161">
                  <rect x="34.6" y="28.1" transform="matrix(.707 -.707 .707 .707 -15.154 36.586)" width="4" height="17"></rect>
                  <circle cx="20" cy="20" r="16"></circle>
                </g>
                <rect x="36.2" y="32.1" transform="matrix(.707 -.707 .707 .707 -15.839 38.239)" fill="#37474F" width="4" height="12.3"></rect>
                <circle fill="#64B5F6" cx="20" cy="20" r="13"></circle><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
              </svg>
            </a>
          </li>
        </ul>        

    )

}

