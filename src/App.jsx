import React from 'react';
import Landing from './components/Landing'
import { Route } from "react-router-dom";
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {};
  }
  
  componentDidMount(){
  }

  render(){
    return (
    <React.Fragment>

        <Route
              path="/"
              exact='true'
              render={(props) => (
                <Landing />
              )}
            />

    </React.Fragment>
    );
  }  


}

export default App;
