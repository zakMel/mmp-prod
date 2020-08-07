import React from 'react';
import './App.css';
import {firestore} from './configFirebase';
const db = firestore;
const greens = db.collection("food").doc("greens");

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount(){
    
    greens.get()
    .then(doc => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          console.log("No such document!");
      }
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>
    );
  }  
}

export default App;
