import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import NavBar from "./NavBar";
import uiLogo from '../pics/arm.png';
import "../App.css"

export default function LoginUI (props) {


    // Configure FirebaseUI.
   let uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
        }
    };

    return (
        <React.Fragment>
            <NavBar />
            <img src={uiLogo} alt='logo' className="uiLogo" />
            <div className="loginUiContainer">
                <p className="text-center">Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        </React.Fragment>
    )
}