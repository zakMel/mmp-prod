import React from 'react';
import logo from '../pics/splash.png';
import "../style/landing.css";

class Landing extends React.Component {

  state = {};
  

  render() {

    return (
    <React.Fragment>
      <div className="landingContainer">

          <img src={logo} alt='logo' className="logo" />
       
      </div>
    </React.Fragment>
    )
  }
}  




export default Landing;
