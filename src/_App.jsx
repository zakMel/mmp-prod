import React from 'react';
import App from './components/App'
import Splash from './components/SplashScreen';
import { withRouter } from "react-router-dom";
import './App.css';


class _App extends React.Component {

  state = {
    isLoading: true,
  };

  componentWillUnmount() {
    this.handleLoading();
  }

  handleLoading = () => {
    this.setState(()=> {
      return{
        isLoading: false
      }
    })
  }

  updateState = (obj) => {
    this.setState(()=>{
      return obj;
    })
  }

  render(){
    return (
      <React.Fragment>
        {this.state.isLoading
        ?
          <Splash
          handleLoading={this.handleLoading}
          updateState={this.updateState}
          />
          :
          <App 
          isSignedIn={this.state.isSignedIn}
          />
      
        }
      </React.Fragment>
    )

  }

}

export default withRouter(_App);
