import React, { useEffect } from 'react';
import firebase from 'firebase';
import NavBar from '../components/NavBar'
import logo from '../pics/splash.png';
import "../App.css"

class Splash extends React.Component {
    state={}

    componentDidMount() {
        // this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        //     (user) => this.setState({isSignedIn: !!user})
        // );
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            async (user) => {
                await this.props.updateState({isSignedIn: !!user})
                this.props.handleLoading()
            }
        ) 
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="splashContainer">

                <img src={logo} alt='logo' className="splashLogo" />

                </div>
            </React.Fragment>
        ) 
    }
   
}

export default Splash;