import React from 'react';
import firebase from 'firebase';
import "../App.css";

export default function Footer (props) {
    let auth = firebase.auth()
    let user = auth.currentUser;
    
    let logout = () => {
        if(user){
            auth.signOut();

        } else {
            
        }
    }

    return (
        <React.Fragment>
            <div className="footer" >
            <p className="footerText">Happy Meal Planning!</p>
            <button
            visible={user ? "visible" : "hidden"} 
            className="footLogButton"
            onClick={() => {logout()}}
            >Logout</button>
            </div>
        </React.Fragment>
    )

}
















 
  
