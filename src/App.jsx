import React from 'react';
import './App.css';
import {firestore} from './configFirebase';
import dbServices from './services/dbServices'


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {};
  }
  
  componentDidMount(){
    const db = firestore;
    const greens = db.collection("food").doc("greens");
    dbServices.get(greens); 

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Keep it up Zachary!!!</h1>
          <h3>"Just Make Progress Today :)"</h3>
        </header>
      </div>
    );
  }  

  
}

export default App;
